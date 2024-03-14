import { GetServerSidePropsContext } from "next";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import InsightPage from "components/organisms/InsightPage/InsightPage";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

import useRepositories from "lib/hooks/api/useRepositories";
import { fetchApiData } from "helpers/fetchApiData";

const EditInsightPage = ({ insight, workspaceId }: { insight: DbUserInsight; workspaceId: string }) => {
  const { data: repos } = useRepositories(insight?.repos.map((ir) => ir.repo_id), 30, 100);

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <InsightPage edit={true} insight={insight} pageRepos={repos} workspaceId={workspaceId} />
    </WorkspaceLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = ctx.params!["workspaceId"] as string;
  const insightId = ctx.params!["insightId"] as string;

  const { data: insight } = await fetchApiData<DbUserInsight>({
    path: `workspaces/${workspaceId}/insights/${insightId}`,
    bearerToken,
  });

  // workspace team member access is handled by API: 404 if the workspace insight
  // is not accessible by user
  if (!insight) {
    return {
      notFound: true,
    };
  }

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);
  const canEdit = !!workspaceMembers?.data?.find(
    (member) => ["owner", "editor"].includes(member.role) && member.user_id === userId
  );

  if (!canEdit) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      insight,
      workspaceId,
    },
  };
};

EditInsightPage.SEO = {
  title: "Edit Insight Page | OpenSauced Insights",
  noindex: true,
};

export default EditInsightPage;
