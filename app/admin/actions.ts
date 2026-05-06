"use server";

import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();

  if (!email || !password || password.length < 8) {
    return { error: "Email et mot de passe requis (8 caractères minimum)." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Email invalide." };
  }

  const hash = await bcrypt.hash(password, 12);
  const { error } = await supabase
    .from("users")
    .insert({ email, password_hash: hash, role: "student" });

  if (error) {
    if (error.code === "23505") return { error: "Cet email existe déjà." };
    return { error: "Erreur lors de la création du compte." };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function toggleActive(userId: string, currentState: boolean) {
  const session = await requireAdmin();
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(userId)) return { error: "Identifiant invalide." };
  if (userId === session.user.id) {
    return { error: "Impossible de modifier votre propre compte." };
  }

  const { error } = await supabase
    .from("users")
    .update({ is_active: !currentState })
    .eq("id", userId);

  if (error) return { error: "Erreur lors de la mise à jour." };

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(userId)) return { error: "Identifiant invalide." };
  if (userId === session.user.id) {
    return { error: "Impossible de supprimer votre propre compte." };
  }

  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) return { error: "Erreur lors de la suppression." };

  revalidatePath("/admin");
  return { success: true };
}
