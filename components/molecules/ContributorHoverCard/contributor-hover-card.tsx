import { useRouter } from "next/router";

import Text from "components/atoms/Typography/text";
import CardProfile from "../CardProfile/card-profile";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import { calcDistanceFromToday } from "lib/utils/date-utils";
import ContributorTable from "../ContributorTable/contributor-table";

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
  topic?: string;
}
const ContributorHoverCard = ({
  repoList,
  githubName,
  totalPR,
  dateOfFirstPr,
  githubAvatar
}: ContributorHoverCardProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;

  const calculatedDateFromToday = dateOfFirstPr ? calcDistanceFromToday(new Date(parseInt(dateOfFirstPr))) : "-";
  return (
    <div className="w-[364px] bg-white gap-4 p-3 rounded-lg shadow-superlative flex flex-col">
      <div>
        <CardProfile dateOfFirstPR={calculatedDateFromToday} githubName={githubName} totalPRs={totalPR} />
      </div>
      <div className="">
        <ContributorTable limit={5} contributor={githubName} topic={topic} repositories={undefined} />
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
