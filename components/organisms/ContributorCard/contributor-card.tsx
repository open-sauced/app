import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart, {
  LanguageObject
} from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import ContributorTable from "components/molecules/ContributorTable/contributor-table";
import { useTopicContributorCommits } from "lib/hooks/useTopicContributorCommits";
import { useState } from "react";

/*
  Use this hook in the Contributor Page componenttbecause it has all the mock data:
  import useContributorCard from "lib/hooks/useContributorCard";
*/
interface ContributorObject {
  profile: {
    githubAvatar: string;
    githubName: string;
    totalPRs: number;
    dateOfFirstPR: string;
  };
  repoList: RepoList[];
  languageList: LanguageObject[];
}

interface ContributorCardProps {
  className?: string;
  contributor: ContributorObject;
}

const ContributorCard = ({ className, contributor }: ContributorCardProps) => {
  const { profile, repoList, languageList } = contributor;
  const [showPRs, setShowPRs] = useState(false);
  const { chart } = useTopicContributorCommits(profile.githubName);

  return (
    <Card className={className && className}>
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-between items-center gap-2">
          <CardProfile {...profile} />
          <div>
            <CardHorizontalBarChart languageList={languageList} />
          </div>
        </div>
        <div className="h-[110px] overflow-hidden">
          <CardLineChart lineChartOption={chart} />
        </div>
        <CardRepoList repoList={repoList} />
        {showPRs ? <ContributorTable contributor={profile.githubName} /> : null}
        <div className="flex w-full justify-center">
          <button
            onClick={() => setShowPRs((prevState) => !prevState)}
            className="w-full bg-white py-1 border-light-slate-6 hover:bg-light-slate-1 rounded-lg border transition"
          >
            <Text className="!text-sm !text-light-slate-11  ">{showPRs ? "Hide" : "Show"} latest pull requests</Text>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ContributorCard;
