import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Important 5: Runtime guard on environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "student";
  is_active: boolean;
  created_at: string;
}
