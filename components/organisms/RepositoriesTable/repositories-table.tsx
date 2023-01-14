import { StaticImageData } from "next/image";
import { Serie } from "@nivo/line";

import RepoRow from "components/molecules/RepoRow/repo-row";

import { getAvatarLink } from "lib/utils/github";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

export interface ContributorsRows {
  name?: string;
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
}

export interface RepositoriesRows {
  id: string;
  name?: string;
  owner?: string;
  handle?: string;
  activity?: string;
  owner_avatar?: string;
  openPrsCount?: number;
  mergedPrsCount?: number;
  closedPrsCount?: number;
  draftPrsCount?: number;
  churnTotalCount?: number;
  churnDirection?: string;
  amount?: string;
  churn?: string;
  spamPrsCount?: number;
  prVelocityCount?: number;
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
  row: "hidden md:flex gap-4    items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    checkbox: "w-9 mr-0.5",
    repository: "w-[30%] lg:flex-1  lg:min-w-[200px] ",
    activity: "flex-1 lg:min-w-[100px] flex ",
    prOverview: "flex-1 lg:min-w-[170px] ",
    prVelocity: "flex justify-center lg:min-w-[100px] items-center gap-3 flex-1",
    spam: "flex items-center justify-center lg:min-w-[50px] lg:justify-start gap-3 flex-1 ",
    contributors: "flex-1 lg:min-w-[200px] items-center",
    last30days: "flex-1 lg:min-w-[150px]"
  }
};

const RepositoriesTable = ({
  listOfRepositories,
  loading,
  error,
  topic,
  user,
  repo,
  selectedRepos,
  handleOnSelectRepo
}: RepositoriesTableProps): JSX.Element => {
  const isLoadedWithRepos = !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length > 0;
  const isFilteredRepoNotIndexed =
    Array.isArray(repo) && !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length === 0;
  const [repoOwner, repoName] = repo && Array.isArray(repo) ? repo : [];

  return (
    <section className="flex  flex-col">
      {loading && <SkeletonWrapper height={50} count={10} radius={4} classNames="px-6 mt-2" />}
      {error && <>An error has occured...</>}

      {isLoadedWithRepos &&
        listOfRepositories.map((item, index) => {
          const isSelected = selectedRepos.find(iteratedRepo => iteratedRepo.id == item.id) != undefined;
          return (
            <RepoRow key={`${item.handle}/${item.name}/${index}`} topic={topic} repo={item} userPage={user} selected={isSelected} handleOnSelectRepo={handleOnSelectRepo} />
          );
        })}
      {isLoadedWithRepos && isFilteredRepoNotIndexed && (
        <RepoRow
          topic={topic}
          // eslint-disable-next-line
          repo={{
            id: "",
            owner: repoOwner,
            handle: repoOwner,
            name: repoName,
            // eslint-disable-next-line camelcase
            owner_avatar: getAvatarLink(repoOwner as string)
          }}
          userPage={user}
          handleOnSelectRepo={handleOnSelectRepo}
        />
      )}
    </section>
  );
};

export default RepositoriesTable;
