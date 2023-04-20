import { useRouter } from "next/router";
import useStore from "lib/store";

import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";
import Select from "components/atoms/Select/custom-select";

import { calcDistanceFromToday } from "lib/utils/date-utils";

import ContributorCard from "../ContributorCard/contributor-card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import useContributors from "lib/hooks/api/useContributors";
import { getAvatarByUsername } from "lib/utils/github";

interface ContributorProps {
  repositories?: number[];
}

const Contributors = ({ repositories }: ContributorProps): JSX.Element => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;
  const store = useStore();
  const range = useStore((state) => state.range);
  const { data, meta, setPage, setLimit, isError, isLoading } = useContributors(10, repositories, range);

  const contributors = data.map(pr => {
    return {
      host_login: pr.author_login,
      first_commit_time: pr.created_at
    };
  });

  const contributorArray = isError
    ? []
    : contributors.map((contributor) => {
      const timeSinceFirstCommit = calcDistanceFromToday(new Date(contributor.first_commit_time));

      return {
        profile: {
          githubAvatar: getAvatarByUsername(contributor.host_login),
          githubName: contributor.host_login,
          dateOfFirstPR: timeSinceFirstCommit
        }
      };
    });

  return (
    <>
      {/* Table section */}
      <TableHeader
        updateLimit={setLimit}
        metaInfo={meta}
        entity="Contributors"
        range={range}
        setRangeFilter={store.updateRange}
        title="Contributors"
      />

      <div className="grid w-full gap-3 grid-cols-automobile md:grid-cols-autodesktop">
        {isLoading ? <SkeletonWrapper height={210} radius={12} count={9} /> : ""}
        {isError ? <>An error occurred!..</> : ""}
        {contributorArray.map((contributor, index) => (
          <ContributorCard
            key={index}
            className=""
            contributor={{ ...contributor }}
            topic={topic}
            repositories={repositories}
            range={range}
          />
        ))}
      </div>

      {/* Table footer */}

      <div className="flex flex-col w-full px-2 mt-5 gap-y-3 md:flex-row">
        <Select
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: 10 },
            { name: "20 per page", value: 20 },
            { name: "30 per page", value: 30 },
            { name: "40 per page", value: 40 },
            { name: "50 per page", value: 50 }
          ]}
          className="!w-36 ml-auto md:hidden overflow-x-hidden"
          onChange={function (limit: number): void {
            setLimit(limit);
          }}
        ></Select>

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
    </>
  );
};
export default Contributors;
