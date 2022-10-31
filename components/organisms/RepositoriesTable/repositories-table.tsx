import { Serie } from "@nivo/line";
import RepoRow from "components/molecules/RepoRow/repo-row";
import { StaticImageData } from "next/image";

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
  listOfRepositories: RepositoriesRows[];
  loading: boolean;
  error: boolean;
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

const RepositoriesTable = ({ listOfRepositories, loading, error }: RepositoriesTableProps): JSX.Element => {
  return (
    <section className="flex  flex-col">
      {loading && <>Loading...</>}
      {error && <>An error has occured...</>}
      {!loading &&
        !error &&
        Array.isArray(listOfRepositories) &&
        listOfRepositories.length > 0 &&
        listOfRepositories.map((repo, index) => <RepoRow key={`${repo.handle}/${repo.name}/${index}`} repo={repo} />)}
    </section>
  );
};

export default RepositoriesTable;
