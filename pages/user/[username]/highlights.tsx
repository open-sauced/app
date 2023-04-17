import Contributor, { handleUserSSR, UserSSRPropsContext } from "../[username]";

export default Contributor;

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  return await handleUserSSR(context);
};

