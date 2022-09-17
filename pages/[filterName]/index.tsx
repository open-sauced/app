import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "components/templates/Loader/loader";

const Filter: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("hacktoberfest/dashboard");
  }, [router]);

  return (
    <Loader theme={"dark"}/>
  );
};

export default Filter;