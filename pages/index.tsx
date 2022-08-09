import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: WithPageLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("hacktoberfest");
  }, [router]);

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      Test Page
    </main>
  );
};

export default Home;