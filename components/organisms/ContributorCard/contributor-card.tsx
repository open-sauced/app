import { useState } from "react";

import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";

import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import useContributorLanguages from "lib/hooks/api/useContributorLanguages";

export interface ContributorObject {
  profile: {
    githubAvatar: string;
    githubName: string;
    dateOfFirstPR: string;
  };
}

interface ContributorCardProps {
  className?: string;
  contributor: ContributorObject;
  topic: string;
  repositories?: number[];
  range?: number;
}

const ContributorCard = ({ className, contributor, topic, repositories, range }: ContributorCardProps) => {
  const { profile } = contributor;

  const [showPRs, setShowPRs] = useState(false);
  const { chart, repoList, meta } = useContributorPullRequestsChart(profile.githubName, topic, repositories, range);
  const languageList = useContributorLanguages(profile.githubName);

  return (
    <Card className={className && className}>
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-between items-center gap-2">
          <CardProfile {...profile} totalPRs={meta.itemCount} />
          <div>
            <CardHorizontalBarChart withDescription={false} languageList={languageList} />
          </div>
        </div>
        <div className="h-[110px] overflow-hidden">
          <CardLineChart lineChartOption={chart} />
        </div>
        <CardRepoList repoList={repoList} total={repoList.length} />

        {showPRs ? (
          <PullRequestTable contributor={profile.githubName} topic={topic} repositories={repositories} range={range} />
        ) : null}

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
