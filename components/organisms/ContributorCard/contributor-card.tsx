import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart, { LanguageObject } from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import ContributorTable, { PRs } from "components/molecules/ContributorTable/contributor-table";
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
  lineChartOption: object;
  languagesUsed: LanguageObject[];
  prList: PRs[];
}

interface ContributorCardProps {
  className?: string;
  contributor: ContributorObject;
}

const ContributorCard = ({ className, contributor }: ContributorCardProps) => {
  const { profile, repoList, lineChartOption, languagesUsed, prList } = contributor;
  const [ showPRs, setShowPRs ] = useState(false);

  return (
    <Card className={className} >
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between gap-2">
          <CardProfile {...profile} />
          <div className="w-32">
            <CardHorizontalBarChart languagesUsed={languagesUsed} />
          </div>
        </div>
        <CardLineChart lineChartOption={lineChartOption}/>
        <CardRepoList repoList={repoList}/>
        {showPRs ? 
          <div className="p-4">
            <ContributorTable prList={prList} />
          </div>
        
          :
        
          null
        }
        <div className="flex w-full py-3 justify-center">
          <Button onClick={() => setShowPRs(prevState => !prevState)} type="link">
            <Text className="!text-xs !text-light-slate-11 font-medium">
              {showPRs ? "Hide" : "Show"} latest pull requests
            </Text>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContributorCard;