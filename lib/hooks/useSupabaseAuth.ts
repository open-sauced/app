import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { UserCredentials } from "@supabase/gotrue-js/src/lib/types";

let base = "http://localhost:3000";

if (process.env.CONTEXT === "deploy-preview") {
  base = `${process.env.DEPLOY_PRIME_URL}/`;
} else {
  if (process.env.CHANNEL !== undefined && ["alpha", "beta"].includes(process.env.CHANNEL)) {
    const {protocol, hostname} = new URL(process.env.URL ?? "/");
    base = `${protocol}//${process.env.CHANNEL}.${hostname}/`;
  }
}

console.log(base);

const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = supabase.auth.session();
    setUser(currentUser?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: (data: UserCredentials) => supabase.auth.signIn(data, {
      redirectTo: base
    }),
    signOut: () => supabase.auth.signOut(),
    user
  };
};

export default useSupabaseAuth;
