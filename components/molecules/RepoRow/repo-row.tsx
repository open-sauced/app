import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";
import Pill from "components/atoms/Pill/pill";
import RepoRowDesktop from "./repo-row-desktop";
import { useContributionsList } from "lib/hooks/useContributionsList";
import { useRepositoryCommits } from "lib/hooks/useRepositoryCommits";
import differenceInDays from "date-fns/differenceInDays";
import {useMediaQuery} from "lib/hooks/useMediaQuery";
import RepoRowMobile from "./repo-row-mobile";
interface RepoProps {
  repo: RepositoriesRows;
}

interface CommitGraphData {
  x: number,
  y: number;
}

const getActivity = (total?: number, loading?: boolean) => {
  if (total === undefined || loading) {
    return "-";
  }

  if (total > 80) {
    return <Pill icon={<ArrowTrendingUpIcon color="green" className="h-4 w-4" />} text="High" color="green" />;
  }

  if (total >= 20 && total <= 80) {
    return <Pill icon={<MinusSmallIcon color="black" className="h-4 w-4" />} text="Medium" color="yellow" />;
  }

  return <Pill icon={<ArrowTrendingDownIcon color="red" className="h-4 w-4" />} text="Low" color="red" />;
};

const getCommitsLast30Days = (commits: DbRepoCommit[]): CommitGraphData[] => {
  const commitDays = commits.reduce((days: { [name: string]: number }, curr: DbRepoCommit) => {
    const day = differenceInDays(new Date(), new Date(Number(curr.commit_time)));

    if (days[day]) {
      days[day]++;
    } else {
      days[day] = 1;
    }

    return days;
  }, {});

  const days: any[] = [];
  for(let d=30;d>=0;d--) {
    days.push({ x: d, y: commitDays[d] || 0 });
  }

  return days;
};

const getTotalPrs = (openPrsCount?: number, mergedPrsCount?: number, closedPrsCount?: number, draftPrsCount?: number): number => {
  const open = openPrsCount || 0;
  const merged = mergedPrsCount || 0;
  const closed = closedPrsCount || 0;
  const drafts = draftPrsCount || 0;

  const total = open + closed + merged - drafts;

  if (total <= 0) {
    return 0;
  }
  
  return total;
};

const getPrsMerged = (total: number, merged: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor(merged/total * 100);

  return result;
};

const getPrsSpam = (total: number, spam: number): number => {
  if (total <= 0) {
    return 0;
  }

  const result = Math.floor(spam/total * 100);

  return result;
};


const RepoRow = ({repo}:RepoProps): JSX.Element => {
  const { name, owner: handle, owner_avatar: ownerAvatar, openPrsCount, closedPrsCount, draftPrsCount, mergedPrsCount, spamPrsCount } = repo;

  const { data: contributorData, meta: contributorMeta } = useContributionsList(repo.id, "", "updated_at");
  const { data: commitsData, meta: commitMeta, isLoading: commitLoading } = useRepositoryCommits(repo.id);
  const totalPrs = getTotalPrs(openPrsCount, mergedPrsCount, closedPrsCount, draftPrsCount);
  const prsMergedPercentage = getPrsMerged(totalPrs, mergedPrsCount || 0);
  const spamPrsPercentage = getPrsSpam(totalPrs, spamPrsCount || 0);
  const isNotMobile: boolean = useMediaQuery("(min-width: 768px)");

  const days = getCommitsLast30Days(commitsData);
  const last30days = [
    {
      "id": `last30-${repo.id}`,
      "color": "hsl(63, 70%, 50%)",
      data: days
    }
  ];

  const repoRowProps = {repo,days,last30days,spamPrsPercentage,prsMergedPercentage,totalPrs, commitLoading, commitsData,commitMeta,contributorData, contributorMeta, getActivity};

  return (<>
    {isNotMobile ? <RepoRowDesktop  {...repoRowProps} />: <RepoRowMobile  {...repoRowProps}/>}
  </>)

  ;
};
export default RepoRow;
