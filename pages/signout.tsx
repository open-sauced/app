import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useRouter } from "next/router";


const SignOut: WithPageLayout = () => {
  const { signOut } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    if(signOut && router) {
      signOut();
      router.push("/");
    }
  }, [signOut, router]);

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      Test Page
    </main>
  );
};

export default SignOut;