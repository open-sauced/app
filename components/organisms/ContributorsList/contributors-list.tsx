import { useState } from "react";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";
import TableHeader from "components/molecules/TableHeader/table-header";
import { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import ContributorCard from "../ContributorCard/contributor-card";

interface ContributorsListProps {
  contributors: DbPRContributor[];
  isLoading: boolean;
  meta: Meta;
  setPage: (page: number) => void;
  range: string;
  showOSCR?: boolean;
}

interface ContributorCardListProps {
  contributors: DbPRContributor[];
  topic: string;
  range: string;
}

const ContributorCardList = ({ contributors = [], topic, range }: ContributorCardListProps) => {
  return (
    <div className="grid w-full gap-3 grid-cols-automobile md:grid-cols-autodesktop">
      {contributors.map((contributor) => {
        return <ContributorCard key={contributor.author_login} contributor={contributor} topic={topic} range={range} />;
      })}
    </div>
  );
};

const ContributorsList = ({
  contributors,
  isLoading,
  meta,
  setPage,
  range,
  showOSCR = false,
}: ContributorsListProps) => {
  const [layout, setLayout] = useState<ToggleValue>("list");

  return (
    <>
      <TableHeader
        title="Contributors"
        metaInfo={meta}
        entity="contributors"
        layout={layout}
        onLayoutToggle={setLayout}
      />

      <ClientOnly>
        {layout !== "grid" ? (
          <>
            <ContributorListTableHeaders showOSCR={showOSCR} />
            <ContributorTable
              loading={isLoading}
              topic={"*"}
              contributors={contributors}
              range={range ?? 30}
              showOSCR={showOSCR}
            />
          </>
        ) : (
          <ContributorCardList contributors={contributors} topic={"*"} range={range ?? 30} />
        )}
      </ClientOnly>

      <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
        <ClientOnly>
          <div>
            <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"contributors"} />
          </div>

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
        </ClientOnly>
      </div>
    </>
  );
};

export default ContributorsList;
