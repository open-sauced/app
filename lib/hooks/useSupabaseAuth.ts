import { useEffect } from "react";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";

import useStore from "../store";
import { supabase } from "../utils/supabase";

const useSupabaseAuth = (loadSession = false) => {
  const store = useStore();
  const user = useStore(state => state.user);
  const sessionToken = useStore(state => state.sessionToken);
  const providerToken = useStore(state => state.providerToken);
  const userId = useStore(state => state.userId);

  useEffect(() => {
    async function getUserSession() {
      const currentUser = await supabase.auth.getSession();
      store.setUser(currentUser?.data.session?.user ?? null);
      store.setSessionToken(currentUser?.data.session?.access_token);
      store.setProviderToken(currentUser?.data.session?.provider_token);
      store.setUserId(currentUser?.data.session?.user?.user_metadata.sub);
    }

    if (loadSession) {
      getUserSession();
    }

    const { data: { subscription: listener } } = supabase.auth.onAuthStateChange((_, session) => {
      store.setUser(session?.user ?? null);
      store.setSessionToken(session?.access_token);
      store.setProviderToken(session?.provider_token);
      store.setUserId(session?.user.user_metadata.sub);
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
    providerToken,
    userId
  };
};

export default useSupabaseAuth;
