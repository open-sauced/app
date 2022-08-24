import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import useContributorCard from "lib/hooks/useContributorCard";
import { useState } from "react";

const ContributorCard = () => {
  const { profile, repoList, lineChart, languageList } = useContributorCard();
  const [showPRs, setShowPRs] = useState(false);

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between gap-2">
          <CardProfile {...profile} />
          <div className="w-32">
            <CardHorizontalBarChart languagesUsed={languageList} />
          </div>
        </div>
        <CardLineChart option={lineChart}/>
        <CardRepoList repoList={repoList}/>
        {showPRs ? 
          <div>Replace with Card PRs</div>
        
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