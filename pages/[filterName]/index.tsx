import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Filter: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("hacktoberfest/dashboard");
  }, [router]);

  return (
    <></>
  );
};

export default Filter;