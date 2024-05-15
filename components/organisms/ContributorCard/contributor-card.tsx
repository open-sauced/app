import { useState } from "react";

import Link from "next/link";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";

import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import useContributorLanguages from "lib/hooks/api/useContributorLanguages";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Badge from "components/atoms/Badge/badge";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import Tooltip from "components/atoms/Tooltip/tooltip";
import Icon from "components/atoms/Icon/icon";
import ForkIcon from "img/icons/fork-icon.svg";
import FirstPRIcon from "img/icons/first-pr-icon.svg";

interface ContributorCardProps {
  className?: string;
  contributor: DbPRContributor;
  topic: string;
  repositories?: number[];
  range?: string;
}

const ContributorCard = ({ className, contributor, topic, repositories, range }: ContributorCardProps) => {
  const [showPRs, setShowPRs] = useState(false);
  const githubAvatar = getAvatarByUsername(contributor.author_login);
  const { repoList, meta } = useContributorPullRequestsChart(contributor.author_login, topic, repositories, range);
  const languageList = useContributorLanguages(contributor.author_login);
  const { data: user } = useFetchUser(contributor.author_login, {
    revalidateOnFocus: false,
  });

  const { is_maintainer: isMaintainer } = user ?? {};

  return (
    <Card className={className && className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full gap-2">
          <Link href={`/user/${contributor.author_login}`} as={`/user/${contributor.author_login}`}>
            <div className="flex items-center gap-2">
              <Avatar size={40} avatarURL={githubAvatar ? githubAvatar : undefined} />
              <div>
                <div>
                  <Text className="!text-base !text-black  ">{contributor.author_login}</Text>
                </div>
                <div className="flex gap-2 text-xs">
                  <div className="flex items-center gap-1 text-xs text-light-slate-11">
                    {meta.itemCount !== undefined && (
                      <>
                        <Tooltip content="PRs merged">
                          <Icon size={12} alt="PRs merged" IconImage={ForkIcon} />
                        </Tooltip>
                        {meta.itemCount} PR
                        {meta.itemCount === 1 ? "" : "s"}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-light-slate-11">
                    <Tooltip content="First commit date">
                      <Icon size={12} alt="First commit date" IconImage={FirstPRIcon} /> {contributor.updated_at}
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex flex-col items-end gap-2">
            <CardHorizontalBarChart withDescription={false} languageList={languageList} />
            {!!isMaintainer && <Badge text="maintainer" />}
          </div>
        </div>
        <div className="h-32">
          <CardLineChart
            contributor={contributor.author_login}
            repoIds={repositories}
            range={Number(range ?? 30)}
            className="max-h-36"
          />
        </div>
        <CardRepoList repoList={repoList} total={repoList.length} />

        {showPRs ? (
          <PullRequestTable
            contributor={contributor.author_login}
            topic={topic}
            repositories={repositories}
            range={range}
          />
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
