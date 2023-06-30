import Contributor, { handleUserSSR, UserSSRPropsContext } from "./index";

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  const username = context?.params?.username;

  if (!username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return await handleUserSSR(context);
};

export default Contributor;
