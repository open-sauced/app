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
    <main className="flex absolute left-0 right-0 flex-1 flex-col items-center justify-center px-20 text-center">
      <Loader theme={"light"}/>
    </main>
  );
};

export default Home;
