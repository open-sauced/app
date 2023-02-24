import Link from "next/link";
import { LinkIcon } from "@primer/octicons-react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { User } from "@supabase/supabase-js";

import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";

import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { getRelativeDays } from "lib/utils/date-utils";
import getRepoInsights from "lib/utils/get-repo-insights";

import CardRepoList from "../CardRepoList/card-repo-list";
import PieChart, { PieData } from "../PieChart/pie-chart";
import StackedAvatar from "../StackedAvatar/stacked-avatar";

interface InsightPageCardProps {
  user: User | null;
  insight: DbUserInsight;
}

const InsightPageCard = ({ insight, user }: InsightPageCardProps): JSX.Element => {
  const members: any[] = [];
  const repoIds = insight.repos.map((repo) => repo.repo_id);
  const { data: repoData, isError, isLoading } = useRepositoriesList(false, repoIds);
  const { open, closed, merged, drafts, velocity, total, repoList } = getRepoInsights(repoData);

  const PieChartData: PieData[] = [
    {
      label: "open",
      value: open,
      id: "open",
      color: "hsla(131, 41%, 46%, 1)"
    },
    {
      label: "merged",
      value: merged,
      id: "merged",
      color: "hsla(272, 51%, 54%, 1)"
    },
    {
      label: "closed",
      value: closed,
      id: "closed",
      color: "hsla(11, 89%, 54%, 1)"
    },
    {
      label: "draft",
      value: drafts,
      id: "draft",
      color: "hsla(205, 11%, 78%, 1)"
    }
  ];

  // Function to handle copy to clipboard
  const handleCopyToClipboard = async (content: any) => {
    const url = new URL(content, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.log(error);
    }
  };

  const averagePrOpened = repoData.length > 0 ? Math.round(((open || 0) / total) * 100) : 0;

  return (
    <div className=" w-[428px] py-[15px] px-[14px] rounded-lg flex flex-col gap-y-3 gap-x-2 bg-white border">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div>{insight.name}</div>

        <div className="items-center flex">
          {members.length > 0 ? <StackedAvatar visibleQuantity={2} contributors={members} /> : ""}
          {members.length > 2 ? <div>&nbsp;{`+${members.length - 2} members`}</div> : ""}
        </div>
      </div>

      {/* Card body */}
      <div className="flex justify-between items-center">
        <div className="flex-1 pl-6">
          <PieChart data={PieChartData} />
        </div>
        <div className="flex gap-2 flex-1 flex-col">
          <div className="flex flex-col">
            <span className="text-xs text-light-slate-11">Avg PRs opened</span>
            <div
              className="flex text-light-grass-10 justify-between items-end pr-8 mt-1
            "
            >
              <Text className="!text-xl !text-black !leading-none">{`${open} PR${open > 1 ? "s" : ""}`}</Text>
              <p className="flex items-end">
                <span className="mb-0 leading-none">{`${averagePrOpened}%`}</span>{" "}
                <BsFillArrowUpCircleFill className="ml-1" />
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
            <div className="flex text-green-9 justify-between items-end pr-8 mt-1">
              <Text className="!text-xl !text-black !leading-none">
                {repoData.length > 0 ? getRelativeDays(Math.round(velocity / repoData.length)) : "-"}
              </Text>
              <p className="flex items-end">
                <span className="mb-0 leading-none">{total > 0 ? `${Math.round((merged / total) * 100)}%` : "-"}</span>{" "}
                <BsFillArrowUpCircleFill className="ml-1" fill="green" color="green" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CardRepoList repoList={repoList} limit={2} />
      </div>

      {/* Card footer */}
      <div className="flex mt-4 justify-between">
        <Button
          onClick={() => handleCopyToClipboard(`/pages/${user?.user_metadata.user_name}/${insight.id}/dashboard`)}
          className="!w-48"
          variant="outline"
        >
          {" "}
          <LinkIcon size={16} className="mr-2" /> Copy Link
        </Button>
        <Link href={`/pages/${user?.user_metadata.user_name}/${insight.id}/dashboard`}>
          <Button className="!w-48" variant="primary">
            Go to Insight Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InsightPageCard;
