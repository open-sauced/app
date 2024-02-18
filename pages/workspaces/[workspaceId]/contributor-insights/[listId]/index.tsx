import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const workspaceId = ctx.params!["workspaceId"] as string;
  const listId = ctx.params!["listId"] as string;

  return {
    redirect: {
      destination: `/workspaces/${workspaceId}/contributor-insights/${listId}/overview`,
      permanent: true,
    },
  };
};

const IndexPage = () => {
  const router = useRouter();
  const { workspaceId, listId } = router.query as { workspaceId: string; listId: string };

  useEffect(() => {
    if (workspaceId && listId) {
      router.replace(`/workspaces/${workspaceId}/contributor-insights/${listId}/overview`);
    }
  }, [workspaceId, listId, router]);
};

export default IndexPage;
