import { useRouter } from "next/router";
import InsightPage from "components/organisms/InsightPage/InsightPage";

import useSession from "lib/hooks/useSession";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

const NewInsightPage = () => {
  useSession(true);
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <InsightPage workspaceId={workspaceId} />
    </WorkspaceLayout>
  );
};

NewInsightPage.SEO = {
  title: "Create Repository Insight | Open Sauced Insights",
  description:
    "A repository insight page is a dashboard containing selected repositories that you and your team can get insights from.",
};

export default NewInsightPage;
