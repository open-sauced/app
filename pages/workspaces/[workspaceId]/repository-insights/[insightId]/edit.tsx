import { useRouter } from "next/router";

import InsightPage from "components/organisms/InsightPage/InsightPage";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

import useInsight from "lib/hooks/useInsight";
import useRepositories from "lib/hooks/api/useRepositories";
import useInsightMembers from "lib/hooks/useInsightMembers";
import useInsightRepositories from "lib/hooks/useInsightRepositories";

const EditInsightPage = () => {
  const router = useRouter();
  const { insightId, workspaceId } = router.query as { insightId: string; workspaceId: string };
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);
  const { isLoading: insightTeamMembersLoading, isError: insightTeamMembersError } = useInsightMembers(Number(id));
  const { data: insightRepos } = useInsightRepositories(Number(id));
  const { data: repos } = useRepositories(
    insightRepos.map((ir) => ir.repo_id),
    30,
    50
  );

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
