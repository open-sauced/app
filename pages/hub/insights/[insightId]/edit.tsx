import { useRouter } from "next/router";

import InsightPage from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";
import useInsight from "lib/hooks/useInsight";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useRepositories from "lib/hooks/api/useRepositories";
import useInsightMembers from "lib/hooks/useInsightMembers";

const EditInsightPage: WithPageLayout = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { insightId } = router.query;
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);
  const { isLoading: insightTeamMembersLoading, isError: insightTeamMembersError } = useInsightMembers(Number(id));
  const insightRepos = insight?.repos.map((repo) => repo.repo_id);
  const { data: repos } = useRepositories(insightRepos, 30, 50);

  if (insightLoading || insightTeamMembersLoading) {
    return <>Loading</>;
  }

  if (insightError) {
    return <>Error</>;
  }

  if (insightTeamMembersError) {
    return <>Unauthorized</>;
  }

  return <InsightPage edit={true} insight={insight} pageRepos={repos} />;
};

EditInsightPage.PageLayout = HubLayout;
EditInsightPage.SEO = {
  title: "Edit Insight Page | OpenSauced Insights",
  noindex: true,
};

export default EditInsightPage;
