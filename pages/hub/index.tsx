import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Hub = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/hub/insights");
  }, [router]);

  return <></>;
};

export default Hub;
