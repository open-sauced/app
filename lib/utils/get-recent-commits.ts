import differenceInDays from "date-fns/differenceInDays";
import { CommitGraphData } from "interfaces/commit-graph.interface";

export const getCommitsLast30Days = (commits: DbRepoCommit[]): CommitGraphData[] => {
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
  for (let d = 30; d >= 0; d--) {
    days.push({ x: d, y: commitDays[d] || 0 });
  }

  return days;
};
