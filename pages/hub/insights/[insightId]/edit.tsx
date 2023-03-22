import { useRouter } from "next/router";

import InsightPage from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";
import useInsight from "lib/hooks/useInsight";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useRepositories from "lib/hooks/api/useRepositories";

const EditInsightPage: WithPageLayout = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { insightId } = router.query;
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);
  const insightRepos = insight?.repos.map(repo => repo.repo_id);
  const { data: repos } = useRepositories(insightRepos);

  if (insightLoading) {
    return <>Loading</>;
  }

  if (insightError) {
    return <>Error</>;
  }

  if (insight && Number(insight.user_id) !== Number(user?.user_metadata.sub)) {
    return <>Unauthorized</>;
  }

  return (
    <InsightPage
      edit={true}
      insight={insight}
      pageRepos={repos}
    />
  );
};

EditInsightPage.PageLayout = HubLayout;
EditInsightPage.SEO = {
  title: "Edit Insight Page | Open Sauced Insights",
  noindex: true
};

export default EditInsightPage;
