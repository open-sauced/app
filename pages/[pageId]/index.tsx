import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "components/templates/Loader/loader";

const Filter: React.FC = () => {
  const router = useRouter();

  const { filterName: topic } = router.query;

  useEffect(() => {
    if (topic) {
      router.push(`${topic}/dashboard/filter/recent`).then(() => {});
    }
  }, [router, topic]);

  return <Loader theme={"dark"} />;
};

export default Filter;
