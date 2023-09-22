import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import ListPageLayout from "layouts/lists";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";

interface ContributorList {
  data: {
    user_id: string;
    created_at: string;
  }[];
  meta: Meta;
}

const useContributorsList = (listId: string) => {
  const { data, error, mutate } = useSWR<ContributorList>(
    `lists/${listId}/contributors`,
    publicApiFetcher as Fetcher<ContributorList, Error>
  );

  const contributors: DbPRContributor[] = data
    ? data.data?.map((contributor) => {
        return {
          author_login: contributor.user_id,
          updated_at: contributor.created_at,
        };
      })
    : [];

  return {
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
const ContributorsList = () => {
  const router = useRouter();
  const { listId } = router.query as { listId: string };
  const { data, isError, isLoading } = useContributorsList(listId);
  const { meta, data: contributors } = data as { meta: Meta; data: DbPRContributor[] };
  const [selectedContributors, setSelectedContributors] = useState<DbPRContributor[]>([]);
  // TODO read from querystring or default to 1
  const [page, setPage] = useState(1);

  function handleOnSelectAllChecked(contributor: any): void {
    throw new Error("Function not implemented.");
  }

  function handleOnSelectChecked(state: boolean, contributor: DbPRContributor): void {
    throw new Error("Function not implemented.");
  }

  // TODO: Is this topic fine or can it be an empty string?
  return (
    <div className="container flex flex-col gap-3">
      <h2>List Contributors</h2>
      {isError ? (
        <div>error</div>
      ) : (
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
      )}
    </div>
  );
};

ContributorsList.PageLayout = ListPageLayout;
export default ContributorsList;
