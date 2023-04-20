import { useState } from "react";

import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart, {
  LanguageObject
} from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardProfile from "components/molecules/CardProfile/card-profile";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";

import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import color from "lib/utils/color.json";
import { getAvatarByUsername } from "lib/utils/github";
import useRepositories from "lib/hooks/api/useRepositories";

const colorKeys = Object.keys(color);

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
  const { chart, data, meta } = useContributorPullRequestsChart(profile.githubName, topic, repositories, range);
  const repoList: RepoList[] = Array.from(new Set(data.map(prData => prData.full_name))).map(repo => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName: repoName,
      repoIcon: getAvatarByUsername(repoOwner)
    };
  });
  const repoIds = data.map(pr => pr.repo_id);
  const { data: repoData } = useRepositories(repoIds);
  const contributorLanguageList = Array.from(new Set(repoData.map(repo => repo.language).filter(language => !!language)));
  const languageList: LanguageObject[] = contributorLanguageList
    .map((language) => {
      const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.toLowerCase());
    
      return {
        languageName: preparedLanguageKey ? preparedLanguageKey.toLowerCase() : language,
        percentageUsed: Math.round((1 / contributorLanguageList.length) * 100)
      };
    });

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
