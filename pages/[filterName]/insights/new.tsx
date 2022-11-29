import InsightPage from "components/organisms/InsightPage/InsightPage";
import HubLayout from "layouts/hub";

import { WithPageLayout } from "interfaces/with-page-layout";

const NewInsightPage: WithPageLayout = () => {
  return <InsightPage />;
};

NewInsightPage.PageLayout = HubLayout;

export default NewInsightPage;
