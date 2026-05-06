import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import UserTable from "./UserTable";
import CreateUserForm from "./CreateUserForm";

export interface UserDisplay {
  id: string;
  email: string;
  role: "admin" | "student";
  is_active: boolean;
  created_at: string;
}

export default async function AdminPage() {
  const session = await auth();
  const { data: users } = await supabase
    .from("users")
    .select("id, email, role, is_active, created_at")
    .order("created_at", { ascending: true });
  
  const userList = (users as UserDisplay[]) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Administration</h1>
        <p className="text-gray-400 mb-8">Gestion des comptes utilisateurs</p>

        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Créer un compte</h2>
          <CreateUserForm />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Utilisateurs ({userList.length})
          </h2>
          <div className="overflow-x-auto">
            <UserTable users={userList} currentUserId={session!.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
