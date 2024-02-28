import { useRouter } from "next/router";

import InsightPage from "components/organisms/InsightPage/InsightPage";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

import useRepositories from "lib/hooks/api/useRepositories";
import useInsightMembers from "lib/hooks/useInsightMembers";
import useWorkspaceRepositoryInsight from "lib/hooks/api/useWorkspaceRepositoryInsight";

const EditInsightPage = () => {
  const router = useRouter();
  const { insightId, workspaceId } = router.query as { insightId: string; workspaceId: string };
  const id = insightId as string;
  const {
    data: insight,
    isLoading: insightLoading,
    isError: insightError,
  } = useWorkspaceRepositoryInsight({ insightId: Number(id), workspaceId });

  // TODO: editing still relies on insight member page membership.
  // in the future, this will be hoisted up to the workspace level
  const { isLoading: insightTeamMembersLoading, isError: insightTeamMembersError } = useInsightMembers(Number(id));
  const { data: repos } = useRepositories(insight?.repos.map((ir) => ir.repo_id), 30, 50);

  if (insightLoading || insightTeamMembersLoading) {
    return <>Loading</>;
  }

  if (insightError) {
    return <>Error</>;
  }

  if (insightTeamMembersError) {
    return <>Unauthorized</>;
  }

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <InsightPage edit={true} insight={insight} pageRepos={repos} workspaceId={workspaceId} />
    </WorkspaceLayout>
  );
};

EditInsightPage.SEO = {
  title: "Edit Insight Page | Open Sauced Insights",
  noindex: true,
};

export default EditInsightPage;
