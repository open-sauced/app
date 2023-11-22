import { Serie } from "@nivo/line";

import RepoRow from "components/molecules/RepoRow/repo-row";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { TableBody } from "components/Table/table";
import type { StaticImageData } from "next/image";

interface ContributorsRows {
  name?: string;
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
}

export interface RepositoriesRows {
  id: string;
  full_name: string;
  activity?: string;
  owner_avatar?: string;
  open_prs_count?: number;
  merged_prs_count?: number;
  closed_prs_count?: number;
  draft_prs_count?: number;
  churnTotalCount?: number;
  churnDirection?: string;
  amount?: string;
  churn?: string;
  spam_prs_count?: number;
  pr_velocity_count?: number;
  prVelocity?: {
    amount?: string;
    churn?: string;
    churnDirection?: string;
  };

  contributors?: ContributorsRows[];
  last30days?: Serie[];
}

interface RepositoriesTableProps {
  user: string | string[] | undefined;
  topic?: string;
  listOfRepositories: RepositoriesRows[];
  loading: boolean;
  error: boolean;
  repo?: string | string[] | undefined[];
  selectedRepos: RepositoriesRows[];
  handleOnSelectRepo: (repo: RepositoriesRows) => void;
}

export const classNames = {
  row: "px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    checkbox: "w-9 mr-0.5 block",
    repository: "lg:min-w-[300px] bg-red-400",
    activity: "lg:min-w-[8.5rem] bg-green-400 text-center",
    prOverview: "lg:min-w-[10rem] bg-blue-400 text-center",
    prVelocity: "lg:min-w-[9rem] bg-purple-400 text-center",
    spam: "lg:min-w-[6rem] bg-orange-400 text-center",
    contributors: "lg:min-w-[13rem] bg-yellow-400 text-center",
    last30days: "lg:min-w-[11rem] bg-pink-400 text-center",
  },
};

const RepositoriesTable = ({
  listOfRepositories,
  loading,
  error,
  topic,
  user,
  repo,
  selectedRepos,
  handleOnSelectRepo,
}: RepositoriesTableProps): JSX.Element => {
  const isLoadedWithRepos = !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length > 0;
  const isFilteredRepoNotIndexed =
    Array.isArray(repo) && !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length === 0;

  return (
    <TableBody className="w-full px-5">
      {loading && <SkeletonWrapper height={50} count={10} radius={4} classNames="px-6 mt-2" />}
      {error && <>An error has occured...</>}

      {isLoadedWithRepos &&
        listOfRepositories.map((item, index) => {
          const isSelected = selectedRepos.find((iteratedRepo) => iteratedRepo.id == item.id) != undefined;
          return (
            <RepoRow
              key={`${item.full_name}/${index}`}
              topic={topic}
              repo={item}
              userPage={user}
              selected={isSelected}
              handleOnSelectRepo={handleOnSelectRepo}
            />
          );
        })}
      {isFilteredRepoNotIndexed && (
        <RepoRow
          topic={topic}
          // eslint-disable-next-line
          repo={{
            id: "",
            full_name: repo.join("/") as string,
          }}
          userPage={user}
          handleOnSelectRepo={handleOnSelectRepo}
        />
      )}
    </TableBody>
  );
};

export default RepositoriesTable;
