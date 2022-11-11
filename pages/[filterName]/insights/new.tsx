import { WithPageLayout } from "interfaces/with-page-layout";
import HubLayout from "layouts/hub";

const NewInsightPage: WithPageLayout = () => {
  return (
    <div>Coming soon. Reach out to <a href="https://github.com/open-sauced/feedback/discussions/5">bdougie</a> for a demo.</div>
  );
};

NewInsightPage.PageLayout = HubLayout;

export default NewInsightPage;
