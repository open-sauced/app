import { useRouter } from "next/router";
import useStore from "lib/store";

import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";
import Select from "components/atoms/Select/custom-select";

import { calcDistanceFromToday } from "lib/utils/date-utils";
import color from "lib/utils/color.json";
import { useTopicContributions } from "lib/hooks/useTopicContributions";

import ContributorCard from "../ContributorCard/contributor-card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

const colorKeys = Object.keys(color);

interface ContributorProps {
  repositories?: number[];
}

const Contributors = ({ repositories }: ContributorProps): JSX.Element => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;
  const { data, setLimit, meta, setPage, page, isError, isLoading } = useTopicContributions(10, repositories);
  const range = useStore((state) => state.range);
  const store = useStore();

  const contributorArray = isError
    ? []
    : data?.map((contributor) => {
      const timeSinceFirstCommit = calcDistanceFromToday(new Date(parseInt(contributor.first_commit_time)));
      const contributorLanguageList = (contributor.langs || "").split(",");
      const repoList = (contributor.recent_repo_list || "").split(",").map((repo) => {
        const [repoOwner, repoName] = repo.split("/");

        return {
          repoName,
          repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
        };
      });
      const languageList = contributorLanguageList.map((language) => {
        const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.toLowerCase());

        return {
          languageName: preparedLanguageKey ? preparedLanguageKey : language,
          percentageUsed: Math.round((1 / contributorLanguageList.length) * 100)
        };
      });

      return {
        profile: {
          githubAvatar: `https://www.github.com/${contributor.host_login}.png?size=60`,
          githubName: contributor.host_login,
          totalPRs: contributor.recent_pr_total,
          dateOfFirstPR: timeSinceFirstCommit
        },
        languageList,
        repoList
      };
    });

  return (
    <>
      {/* Table section */}
      <TableHeader
        updateLimit={setLimit}
        showing={{
          from: page === 1 ? page : (page - 1) * meta.limit + 1,
          to: page === 1 ? meta.limit : page * meta.limit <= meta.itemCount ? page * meta.limit : meta.itemCount,
          total: meta.itemCount,
          entity: "Contributors"
        }}
        range={range}
        setRangeFilter={store.updateRange}
        title="Contributors"
      />

      <div className="w-full grid grid-cols-automobile  md:grid-cols-autodesktop gap-3">
        {isLoading ? <SkeletonWrapper height={210} radius={12} count={9} /> : ""}
        {contributorArray.map((contributor, index) => (
          <ContributorCard
            key={index}
            className=""
            contributor={{ ...contributor }}
            topic={topic}
            repositories={repositories}
          />
        ))}
      </div>

      {/* Table footer */}

      <div className="mt-5 w-full px-2 flex flex-col gap-y-3 md:flex-row">
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

        <div className="py-1 md:py-4 flex w-full md:mt-5 justify-between items-center">
          <div>
            <div className="">
              <PaginationResults
                from={page === 1 ? page : (page - 1) * meta.limit + 1}
                to={page === 1 ? meta.limit : page * meta.limit <= meta.itemCount ? page * meta.limit : meta.itemCount}
                total={meta.itemCount}
                entity={"contributors"}
              />
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