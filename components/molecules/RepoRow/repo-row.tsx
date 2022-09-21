import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";
import { RepositoriesRows } from "components/organisms/RepositoriesTable/repositories-table";

import {classNames} from "components/organisms/RepositoriesTable/repositories-table";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";
import Pill from "components/atoms/Pill/pill";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";

import Sparkline from "components/atoms/Sparkline/sparkline";

import { useContributionsList } from "lib/hooks/useContributionsList";
import { useRepositoryCommits } from "lib/hooks/useRepositoryCommits";
import differenceInDays from "date-fns/differenceInDays";

interface RepoRowProps {
  repo: RepositoriesRows;
}

interface CommitGraphData {
  x: number,
  y: number;
}

const getActivity = (total?: number) => {
  if (total === undefined) {
    return "-";
  }

  if (total > 80) {
    return <Pill text="High" color="green" />;
  }

  if (total > 20 && total < 80) {
    return <Pill text="Medium" color="yellow" />;
  }

  return <Pill text="Low" color="red" />;
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

const getPrsMerged = (openPrsCount?: number, mergedPrsCount?: number, closedPrsCount?: number, draftPrsCount?: number): number => {
  const open = openPrsCount || 0;
  const merged = mergedPrsCount || 0;
  const closed = closedPrsCount || 0;
  const drafts = draftPrsCount || 0;

  const total = open + closed + merged - drafts;

  if (total <= 0) {
    return 0;
  }

  const result = Math.floor(merged/total * 100);

  return result;
};

const RepoRow = ({repo}:RepoRowProps): JSX.Element => {
  const { name, owner: handle, owner_avatar: ownerAvatar, openPrsCount, closedPrsCount, draftPrsCount, mergedPrsCount, spamPrsCount, churn, churnTotalCount, churnDirection, prVelocityCount } = repo;
  const { data: contributorData, meta: contributorMeta } = useContributionsList(repo.id, "", "updated_at");
  const { data: commitsData, meta: commitMeta } = useRepositoryCommits(repo.id);
  const prsMerged = getPrsMerged(openPrsCount, mergedPrsCount, closedPrsCount, draftPrsCount);

  const days = getCommitsLast30Days(commitsData);
  const last30days = [
    {
      "id": `last30-${repo.id}`,
      "color": "hsl(63, 70%, 50%)",
      data: days
    }
  ];

  return (<div className={`${classNames.row}`}>

    {/* Column: Repository Name */}
    <div className={classNames.cols.repository}>
      <TableRepositoryName avatarURL={ownerAvatar} name={name} handle={handle}></TableRepositoryName>
    </div>

    {/* Column: Activity */}
    <div className={classNames.cols.activity}>
      { getActivity(commitMeta.itemCount) }
    </div>

    {/* Column: PR Overview */}
    <div className={classNames.cols.prOverview}>
      <PullRequestOverview open={openPrsCount} merged={mergedPrsCount} closed={closedPrsCount} draft={draftPrsCount} churn={churnTotalCount} churnDirection={`${churnDirection}`}></PullRequestOverview>
    </div>

    {/* Column: PR Velocity */}
    <div className={`${classNames.cols.prVelocity}`}>
      <div>{ prVelocityCount ?? 0 } PR{ prVelocityCount === 1 ? "" : "s" }</div>
      <Pill text={`${prsMerged}%`} size="small" color="green" />
    </div>

    {/* Column: SPAM */}
    <div className={`${classNames.cols.spam}`}>
      {
        spamPrsCount && spamPrsCount > 0 ?  
          <>
            <div>{spamPrsCount || 0} PR{ spamPrsCount === 1 ? "" : "s" }</div>
            <Pill text={`${churn || 0}%`} size="small" color="green" />
          </>
          :
          "-"
      }
    </div>

    {/* Column: Contributors */}
    <div className={`flex ${classNames.cols.contributors}`}>
      { contributorMeta.itemCount! > 0 ? <StackedAvatar contributors={contributorData}/> : "-" }

      { contributorMeta.itemCount! >= 5 ? <div>&nbsp;{`+${contributorMeta.itemCount - 5}`}</div>: "" }
    </div>

    {/* Column: Last 30 Days */}
    <div className={classNames.cols.last30days}>
      { last30days &&
        <Sparkline data={last30days} />
      }
    </div>
  </div>)
  ;
};
export default RepoRow;
