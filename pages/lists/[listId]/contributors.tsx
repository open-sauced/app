import { GetServerSidePropsContext } from "next";
import React from "react";

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const listId = ctx.params?.listId;
  return {
    redirect: {
      destination: `/lists/${listId}/overview`,
      permanent: false,
    },
  };
}

const contributors = () => {
  return <></>;
};

export default contributors;
