import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";

const NewInsightPage: WithPageLayout = () => {
  return (
    <div>Create New Insight</div>
  );
}

NewInsightPage.PageLayout = HubLayout;

export default NewInsightPage;
