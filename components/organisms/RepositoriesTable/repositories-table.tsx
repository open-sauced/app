import { StaticImageData } from "next/image";
import { Serie } from "@nivo/line";

import RepoRow from "components/molecules/RepoRow/repo-row";

import { getAvatarLink } from "lib/utils/github";

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
}

export const classNames = {
  row: "hidden md:flex gap-4    items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
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
  repo
}: RepositoriesTableProps): JSX.Element => {
  const isLoadedWithRepos = !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length > 0;
  const isFilteredRepoNotIndexed = Array.isArray(repo) && !loading && !error && Array.isArray(listOfRepositories) && listOfRepositories.length === 0;
  const [repoOwner, repoName] = repo && Array.isArray(repo) ? repo : [];

  return (
    <section className="flex  flex-col">
      {loading && <>Loading...</>}
      {error && <>An error has occured...</>}

      {
        isLoadedWithRepos && listOfRepositories.map((item, index) => (
          <RepoRow key={`${item.handle}/${item.name}/${index}`} topic={topic} repo={item} user={user} />
        ))}
      {
        isFilteredRepoNotIndexed && <RepoRow
          topic={topic}
          // eslint-disable-next-line
          repo={{id: "", owner: repoOwner, handle: repoOwner, name: repoName, owner_avatar: getAvatarLink(repoOwner as string) }}
          user={user} />
      }
    </section>
  );
};

export default RepositoriesTable;
