import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { WithPageLayout } from "interfaces/with-page-layout";

const Home: WithPageLayout = () => {
  // backup redirect in case something goes wonky server-side
  return (
    <Head>
      <meta name="http-equiv" content="0; url=/" />
    </Head>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const insightId = ctx.params!["pageId"] as string;
  const userOrg = ctx.params!["userOrg"] as string;
  const selectedFilter = ctx.params!["selectedFilter"] as string[];

  return {
    redirect: {
      destination: `/pages/${userOrg}/${insightId}/dashboard/filter/${selectedFilter.join("/")}}`,
      permanent: false,
    },
  };
};
