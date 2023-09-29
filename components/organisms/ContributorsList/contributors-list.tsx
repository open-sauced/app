import { useState } from "react";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import ContributorTable from "components/organisms/ContributorsTable/contributors-table";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import ContributorListTableHeaders from "components/molecules/ContributorListTableHeader/contributor-list-table-header";
import Pagination from "components/molecules/Pagination/pagination";
import TableHeader from "components/molecules/TableHeader/table-header";
import { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import { getAvatarByUsername } from "lib/utils/github";
import ContributorCard from "../ContributorCard/contributor-card";

interface ContributorsListProps {
  contributors: DbPRContributor[];
  isLoading: boolean;
  meta: Meta;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

interface ContributorCardListProps {
  contributors: DbPRContributor[];
  topic: string;
  range: number;
}

const ContributorCardList = ({ contributors = [], topic, range }: ContributorCardListProps) => {
  const contributorArray = contributors.map((contributor) => {
    const dateOfFirstPR = calcDistanceFromToday(new Date(contributor.updated_at));

    return {
      profile: {
        githubAvatar: getAvatarByUsername(contributor.author_login),
        githubName: contributor.author_login,
        dateOfFirstPR,
      },
    };
  });

  return (
    <div className="grid w-full gap-3 grid-cols-automobile md:grid-cols-autodesktop">
      {contributorArray.map((contributor) => {
        return (
          <ContributorCard key={contributor.profile.githubName} contributor={contributor} topic={topic} range={range} />
        );
      })}
    </div>
  );
};

const ContributorsList = ({ contributors, isLoading, meta, setPage, setLimit }: ContributorsListProps) => {
  const [range, setRange] = useState(30);
  const [layout, setLayout] = useState<ToggleValue>("grid");

  return (
    <div className="lg:min-w-[1150px] px-16 py-8">
      <TableHeader
        title="Contributors"
        metaInfo={meta}
        entity="contributors"
        updateLimit={setLimit}
        range={range}
        setRangeFilter={setRange}
        layout={layout}
        onLayoutToggle={setLayout}
      />
      <ContributorListTableHeaders />
      <ClientOnly>
        {layout === "grid" ? (
          <ContributorTable loading={isLoading} topic={"*"} contributors={contributors} />
        ) : (
          <ContributorCardList contributors={contributors} topic={"*"} range={range} />
        )}
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
