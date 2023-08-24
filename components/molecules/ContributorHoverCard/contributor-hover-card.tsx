import { useRouter } from "next/router";

import { calcDistanceFromToday } from "lib/utils/date-utils";
import Badge from "components/atoms/Badge/badge";
import CardProfile from "../CardProfile/card-profile";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import PullRequestTable from "../PullRequestTable/pull-request-table";

export interface ContributorsProfileType {
  githubAvatar: string;
  githubName: string;
  totalPR: number;
}
interface ContributorHoverCardProps {
  repoList: RepoList[];
  githubAvatar: string;
  githubName: string;
  totalPR: number;
  dateOfFirstPr: string | undefined;
  topic?: string;
  repositories?: number[];
  isMaintainer: boolean;
}
const ContributorHoverCard = ({
  repoList,
  githubName,
  totalPR,
  dateOfFirstPr,
  githubAvatar,
  repositories,
  isMaintainer,
}: ContributorHoverCardProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;

  const calculatedDateFromToday = dateOfFirstPr
    ? calcDistanceFromToday(new Date(parseInt(dateOfFirstPr).toString()))
    : "-";

  return (
    <div className="w-[364px] bg-white gap-4 p-3 rounded-lg shadow-superlative flex flex-col">
      <div className="flex items-center justify-between">
        <CardProfile
          dateOfFirstPR={calculatedDateFromToday}
          githubAvatar={githubAvatar}
          githubName={githubName}
          totalPRs={totalPR}
          isRoundedAvatar={true}
        />
        {isMaintainer && <Badge text="maintainer" />}
      </div>
      <div className="">
        <PullRequestTable isHoverCard repositories={repositories} limit={5} contributor={githubName} topic={topic} />
      </div>

      <div>
        <CardRepoList repoList={repoList} limit={3} />
      </div>
    </div>
  );
};

export default ContributorHoverCard;
