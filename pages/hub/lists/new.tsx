import React from "react";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import { WithPageLayout } from "interfaces/with-page-layout";
import HubContributorsPageLayout from "layouts/hub-contributors";

const NewListCreationPage: WithPageLayout = () => {
  return (
    <div>
      <div className="lg:min-w-[1150px]">
        <ContributorListTableHeaders />
        {/* <ContributorTable loading={isLoading} topic={topic} contributors={data}></ContributorTable> */}
      </div>
    </div>
  );
};

NewListCreationPage.PageLayout = HubContributorsPageLayout;

export default NewListCreationPage;
