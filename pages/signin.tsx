import { useEffect } from "react";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const SignInPage = () => {
  const { signIn } = useSupabaseAuth();

  useEffect(() => {
    signIn({
      provider: "github",
      options: {
        redirectTo: `/`,
      },
    });
  }, []);

  return <></>;
};

export default SignInPage;
