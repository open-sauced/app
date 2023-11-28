import Head from "next/head";
import { WithPageLayout } from "../interfaces/with-page-layout";

export const getServerSideProps = async () => {
  // redirect to /feed if middleware doesn't kick in
  return {
    redirect: {
      destination: "/feed",
      permanent: false,
    },
  };
};

const Home: WithPageLayout = () => {
  // backup redirect in case something goes wonky server-side
  return (
    <Head>
      <meta name="http-equiv" content="0; url=/feed" />
    </Head>
  );
};

export default Home;
