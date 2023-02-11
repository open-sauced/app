import { useRouter } from "next/router";

import InsightPage, {GitHubRepo} from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import useInsight from "lib/hooks/useInsight";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const EditInsightPage: WithPageLayout = () => {
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { insightId } = router.query;
  const id = insightId as string;
  const { data: insight, isLoading: insightLoading, isError: insightError } = useInsight(id);
  const insightRepos = insight?.repos.map(repo => repo.repo_id);
  const { data: repos } = useRepositoriesList(false, insightRepos);

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
      pageRepos={repos.map(repo => ({
        full_name: repo.full_name,
        open_issues_count: repo.issues
      }) as GitHubRepo)}
    />
  );
};

EditInsightPage.PageLayout = HubLayout;

export default EditInsightPage;
