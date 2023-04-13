import Contributor, { UserSSRPropsContext } from "../[username]";
export default Contributor;

export async function getServerSideProps({ params }: UserSSRPropsContext) {
  const { username } = params!;
  console.log("username", username);

  return {
    props: { username }
  };
}
