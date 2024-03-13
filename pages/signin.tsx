import { useEffectOnce } from "react-use";

import LoginLayout from "layouts/login";
import { WithPageLayout } from "interfaces/with-page-layout";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const SignInPage: WithPageLayout = () => {
  const { signIn } = useSupabaseAuth();

  useEffectOnce(() => {
    signIn({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/hub/insights/new?auth=true`,
      },
    });
  });

  return <div>Logging In...</div>;
};

SignInPage.PageLayout = LoginLayout;

export default SignInPage;
