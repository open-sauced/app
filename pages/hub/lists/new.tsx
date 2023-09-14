import React, { useEffect, useState } from "react";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import { WithPageLayout } from "interfaces/with-page-layout";
import HubContributorsPageLayout from "layouts/hub-contributors";
import useFetchAllContributors from "lib/hooks/useFetchAllContributors";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import Header from "components/organisms/Header/header";
import HubContributorsHeader from "components/molecules/HubContributorsHeader/hub-contributors-header";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";

const NewListCreationPage: WithPageLayout = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  const { data, meta, isLoading, setLimit, setPage } = useFetchAllContributors();

  const contributors = data
    ? data.length > 0 &&
      data.map((contributor) => {
        return {
          author_login: contributor.user_login,
          updated_at: contributor.user_updated_at,
          user_id: contributor.user_id,
        };
      })
    : [];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const handleOnSelectAllChecked = (state: boolean) => {
    if (state) {
      setSelectedContributors(contributors as DbPRContributor[]);
    } else {
      setSelectedContributors([]);
    }
  };

  const handleOnSelectChecked = (state: boolean, contributor: DbPRContributor) => {
    if (state) {
      setSelectedContributors((prev) => [...prev, contributor]);
    } else {
      setSelectedContributors(selectedContributors.filter((selected) => selected.user_id !== contributor.user_id));
    }
  };

  return (
    <div>
      <div className="info-container container w-full min-h-[100px]">
        <Header>
          <HubContributorsHeader
            selectedContributorsIds={selectedContributors.map((contributor) => contributor.user_id)}
            setLimit={setLimit}
            setRangeFilter={() => {}}
          />
        </Header>
      </div>
      <div className="lg:min-w-[1150px] px-16 py-8">
        <ContributorListTableHeaders
          selected={selectedContributors.length === meta.limit}
          handleOnSelectAllContributor={handleOnSelectAllChecked}
        />
        <ContributorTable
          loading={isLoading}
          selectedContributors={selectedContributors}
          topic={"*"}
          handleSelectContributors={handleOnSelectChecked}
          contributors={contributors as DbPRContributor[]}
        ></ContributorTable>
        <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
          <div>
            <div className="">
              <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <Pagination
                pages={[]}
                hasNextPage={meta.hasNextPage}
                hasPreviousPage={meta.hasPreviousPage}
                totalPage={meta.pageCount}
                page={meta.page}
                onPageChange={function (page: number): void {
                  setPage(page);
                }}
                divisor={true}
                goToPage
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewListCreationPage.PageLayout = HubContributorsPageLayout;

export default NewListCreationPage;
