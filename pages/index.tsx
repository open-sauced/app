import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "components/templates/Loader/loader";

const Home: WithPageLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("hacktoberfest");
  }, [router]);

  return (
    <Loader theme={"dark"}/>
  );
};

export default Home;
