import InsightPage from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";

const NewInsightPage: WithPageLayout = () => {
  return <InsightPage />;
};

NewInsightPage.PageLayout = HubLayout;
NewInsightPage.isPrivateRoute = true;
NewInsightPage.SEO = {
  title: "Create Insight Page | Open Sauced Insights",
  description: "An insight page is a dashboard containing selected repositories that you and your team can get insights from."
};

export default NewInsightPage;
