import { WithPageLayout } from "../interfaces/with-page-layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "components/templates/Loader/loader";

const Home: WithPageLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const redirect = ()=>{
      router.push("hacktoberfest");
    };
    const timer = setTimeout(()=> redirect(),2000);
    return () => clearTimeout(timer);

  }, [router]);

  return (
    <Loader theme={"dark"}/>
  );
};

export default Home;
