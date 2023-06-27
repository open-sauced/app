import Contributor, { handleUserSSR, UserSSRPropsContext } from "./index";

export default Contributor;

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  return await handleUserSSR(context);
};
