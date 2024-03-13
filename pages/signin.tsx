import { useEffectOnce } from "react-use";

import { useRouter } from "next/router";
import LoginLayout from "layouts/login";
import { WithPageLayout } from "interfaces/with-page-layout";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const SignInPage: WithPageLayout = () => {
  const { signIn } = useSupabaseAuth();
  const router = useRouter();
  const { redirectedFrom = "/hub/insights/new" } = router.query as { redirectedFrom?: string };

  useEffectOnce(() => {
    signIn({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}${decodeURIComponent(redirectedFrom)}?auth=true`,
      },
    });
  });

  return <div>Logging In...</div>;
};

SignInPage.PageLayout = LoginLayout;

export default SignInPage;
