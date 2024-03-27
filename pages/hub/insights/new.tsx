import InsightPage from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";
import useSession from "lib/hooks/useSession";

const NewInsightPage: WithPageLayout = () => {
  useSession(true);
  return <InsightPage />;
};

NewInsightPage.PageLayout = HubLayout;
NewInsightPage.SEO = {
  title: "Create Insight Page | OpenSauced Insights",
  description:
    "An insight page is a dashboard containing selected repositories that you and your team can get insights from.",
};

export default NewInsightPage;
