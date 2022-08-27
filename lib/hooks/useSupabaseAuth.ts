import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { UserCredentials } from "@supabase/gotrue-js/src/lib/types";

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
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL ?? "/"
    }),
    signOut: () => supabase.auth.signOut(),
    user
  };
};

export default useSupabaseAuth;
