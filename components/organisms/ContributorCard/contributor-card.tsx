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
import { useFetchUser } from "lib/hooks/useFetchUser";
import Badge from "components/atoms/Badge/badge";

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
  range?: string;
}

const ContributorCard = ({ className, contributor, topic, repositories, range }: ContributorCardProps) => {
  const { profile } = contributor;

  const [showPRs, setShowPRs] = useState(false);
  const { repoList, meta } = useContributorPullRequestsChart(profile.githubName, topic, repositories, range);
  const languageList = useContributorLanguages(profile.githubName);
  const { data: user } = useFetchUser(profile.githubName, {
    revalidateOnFocus: false,
  });

  const { is_maintainer: isMaintainer } = user ?? {};

  return (
    <Card className={className && className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full gap-2">
          <CardProfile {...profile} totalPRs={meta.itemCount} />
          <div className="flex flex-col items-end gap-2">
            <CardHorizontalBarChart withDescription={false} languageList={languageList} />
            {!!isMaintainer && <Badge text="maintainer" />}
          </div>
        </div>
        <div className="h-32">
          <CardLineChart
            contributor={contributor.profile.githubName}
            repoIds={repositories}
            range={Number(range ?? 30)}
            className="max-h-36"
          />
        </div>
        <CardRepoList repoList={repoList} total={repoList.length} />

        {showPRs ? (
          <PullRequestTable contributor={profile.githubName} topic={topic} repositories={repositories} range={range} />
        ) : null}

        <div className="flex justify-center w-full">
          <button
            onClick={() => setShowPRs((prevState) => !prevState)}
            className="w-full py-1 transition bg-white border rounded-lg border-light-slate-6 hover:bg-light-slate-1"
          >
            <Text className="!text-sm !text-light-slate-11  ">{showPRs ? "Hide" : "Show"} latest pull requests</Text>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ContributorCard;
