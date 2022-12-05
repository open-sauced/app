import { useState, useEffect } from "react";
import { SignInWithOAuthCredentials, User } from "@supabase/supabase-js";

import { supabase } from "../utils/supabase";

const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | undefined>(undefined);
  const [providerToken, setProviderToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    async function getUserSession() {
      const currentUser = await supabase.auth.getSession();
      setUser(currentUser?.data.session?.user ?? null);
      setSessionToken(currentUser?.data.session?.access_token);
      setProviderToken(currentUser?.data.session?.provider_token);
    }

    getUserSession();

    const { data: { subscription: listener } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setSessionToken(session?.access_token ?? undefined);
      setProviderToken(session?.provider_token ?? undefined);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: (data: SignInWithOAuthCredentials) => supabase.auth.signInWithOAuth({
      ...data,
      options: {
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL ?? "/"
      }
    }),
    signOut: () => supabase.auth.signOut(),
    user,
    sessionToken,
    providerToken
  };
};

export default useSupabaseAuth;
