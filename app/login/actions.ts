"use server";

import { signIn } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";

  // Validate callbackUrl is a safe relative path (prevent open redirect)
  const safeCallback =
    callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/";

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateLimitKey = `login:${ip}`;
  const rateLimit = checkRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
    return {
      error: `Trop de tentatives. Réessayez dans ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: safeCallback,
    });
    return null;
  } catch (error) {
    if (isRedirectError(error)) {
      resetRateLimit(rateLimitKey);
      throw error;
    }

    if (error instanceof AuthError) {
      return { error: "Identifiants invalides." };
    }

    throw error;
  }
}
