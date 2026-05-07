import { supabase } from "@/lib/supabase";
import LoginForm from "./LoginForm";

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl = "/" } = await searchParams;

  const { count, error: dbError } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true });

  const isFirstRun = !dbError && count === 0;

  return <LoginForm isFirstRun={isFirstRun} callbackUrl={callbackUrl} />;
}
