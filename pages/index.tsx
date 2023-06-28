import { useEffect } from "react";
import { useRouter } from "next/router";

import Loader from "components/templates/Loader/loader";
import { supabase } from "lib/utils/supabase";
import useSession from "lib/hooks/useSession";
import { WithPageLayout } from "../interfaces/with-page-layout";

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
        redirect("/hub/insights");
      } else {
        redirect("/javascript");
      }
    }

    getAccess();
  }, [router, onboarded]);

  return <Loader theme={"dark"} />;
};

export default Home;
