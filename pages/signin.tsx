import { useEffect } from "react";
import { useRouter } from "next/router";

import { WithPageLayout } from "interfaces/with-page-layout";
import LoginLayout from "layouts/login";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const SignInPage: WithPageLayout = () => {
  const { signIn } = useSupabaseAuth(true);
  const router = useRouter();
  const {
    redirectedFrom = "/hub/insights/new",
    destination,
    auth,
  } = router.query as {
    redirectedFrom?: string;
    destination?: string;
    auth?: string;
  };
  const hasParams = Object.keys(router.query).length > 0;
  const hasAuth = auth === "true";

  useEffect(() => {
    if (hasParams) {
      if (destination && hasAuth) {
        router.push(destination);
      } else if (redirectedFrom) {
        signIn({
          provider: "github",
          options: {
            redirectTo: `${window.location.origin}/signin?destination=${redirectedFrom}&auth=true`,
          },
        });
      }
    }
  }, [router.query]);

  return <div>{hasParams && destination && hasAuth ? "Redirecting" : "Logging In"}...</div>;
};

SignInPage.PageLayout = LoginLayout;

export default SignInPage;
