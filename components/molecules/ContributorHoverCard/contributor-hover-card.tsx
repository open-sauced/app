import { VscGitMerge, VscGitPullRequest } from "react-icons/vsc";

import Text from "components/atoms/Typography/text";
import CardProfile from "../CardProfile/card-profile";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import { calcDistanceFromToday } from "lib/utils/date-utils";

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
  dateOfFirstPr: string;
  topic?:string
}
const ContributorHoverCard = ({ repoList, githubName, totalPR, dateOfFirstPr }: ContributorHoverCardProps) => {
  const randomGithubHistory = Array.apply(null, Array(4));

  const calculatedDateFromToday = calcDistanceFromToday(new Date(parseInt(dateOfFirstPr)));
  return (
    <div className="w-[314px] gap-4 p-3 rounded-lg shadow-superlative flex flex-col">
      <div>
        <CardProfile dateOfFirstPR={calculatedDateFromToday} githubName={githubName} totalPRs={totalPR} />
      </div>
      <div className="bg-light-slate-3 text-xs px-2 py-1 text-light-slate-11 rounded">
        <span>Latest PRs</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {randomGithubHistory.map((item, index) => (
          <div key={index} className="flex gap-1 text-xs justify-between items-center">
            <div>
              <VscGitPullRequest className="text-[14px]" color="green" />
            </div>
            <div>
              <Text className="!text-light-slate-12">fix: increase paginated response lim </Text>
            </div>
            <div className="text-light-slate-11">2mo</div>
          </div>
        ))}
      </div>
      <div>
        <CardRepoList repoList={repoList} limit={3} />
      </div>
      <div className="w-full ">
        <button className="w-full text-light-slate-11 text-xs bg-light-slate-1 rounded-lg border py-2">
          Add a Filter
        </button>
      </div>
    </div>
  );
};

export default ContributorHoverCard;
