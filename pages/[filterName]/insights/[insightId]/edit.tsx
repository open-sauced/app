import { useRouter } from "next/router";

import InsightPage, {GitHubRepo} from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";
import useInsight from "lib/hooks/useInsight";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const EditInsightPage: WithPageLayout = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { insightId } = router.query;
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);

  if (insightLoading) {
    return <>Loading</>;
  }

  if (insightError) {
    return <>Error</>;
  }

  if (insight && insight.user_id !== Number(user?.user_metadata.sub)) {
    return <>Unauthorized</>;
  }

  return (
    <InsightPage
      edit={true}
      insight={insight}
      pageRepos={insight?.repos.map(repo => ({
        id: repo.repo_id,
        full_name: repo.full_name,
        // TODO: add live data or remove
        open_issues_count: 0
      }) as GitHubRepo)}
    />
  );
};

EditInsightPage.PageLayout = HubLayout;
EditInsightPage.SEO = {
  title: "Edit Insight Page | Open Sauced Insights",
  noindex: true
};

export default EditInsightPage;
