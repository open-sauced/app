import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Loader from "components/templates/Loader/loader";
import { supabase } from "lib/utils/supabase";
import useSession from "lib/hooks/useSession";

const Home: WithPageLayout = () => {
  const router = useRouter();
  const { onboarded } = useSession();


  useEffect(() => {
    function redirect(destination: string) {
      let redir = setTimeout(() => {
        router.push(destination).then(() => {
          clearTimeout(redir);
        });
      }, 2000);
    }

    async function getAccess() {
      const currentUser = await supabase.auth.getSession();

      if (!currentUser?.data?.session) {
        redirect("/javascript");
      }

      if (onboarded === undefined) {
        return;
      }

      if (currentUser?.data?.session && onboarded === true) {
        const redirectUrl = sessionStorage.getItem("redirectUrl");
        if(redirectUrl) {
          const selectedRepos = sessionStorage.getItem("selectedRepos");
          sessionStorage.removeItem("redirectUrl");
          sessionStorage.removeItem("selectedRepos");
          router.push({pathname: redirectUrl, query: {selectedRepos: selectedRepos || ''}}, redirectUrl);
        } else {
          redirect("/hub/insights");
        }
      } else {
        redirect("/javascript");
      }
    }

    getAccess();
  }, [router, onboarded]);

  return (
    <Loader theme={"dark"}/>
  );
};

export default Home;
