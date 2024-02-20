import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: `/workspaces/${ctx.params?.workspaceId}/repositories`,
      permanent: false,
    },
  };
};

const WorkspacesIndex = () => {};

export default WorkspacesIndex;
