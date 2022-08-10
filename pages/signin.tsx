import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";


const SignIn: WithPageLayout = () => {
  /*  const { signIn, user } = useSupabaseAuth();

  useEffect(() => {
    signIn({ provider: "github" });
  }, [signIn]); */

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      Test Page
    </main>
  );
};

export default SignIn;