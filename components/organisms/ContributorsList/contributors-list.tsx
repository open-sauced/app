import ClientOnly from "components/atoms/ClientOnly/client-only";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";

interface ContributorsListProps {
  contributors: DbPRContributor[];
  isLoading: boolean;
  meta: Meta;
  setPage: (page: number) => void;
}

const ContributorsList = ({ contributors, isLoading, meta, setPage }: ContributorsListProps) => {
  return (
    <div className="lg:min-w-[1150px] px-16 py-8">
      <ContributorListTableHeaders />
      <ClientOnly>
        <ContributorTable loading={isLoading} topic={"*"} contributors={contributors} />
      </ClientOnly>
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
  );
};

export default ContributorsList;
