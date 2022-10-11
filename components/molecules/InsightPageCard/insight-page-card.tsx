import React from "react";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import Button from "components/atoms/Button/button";
import PieChart, { PieData } from "../PieChart/pie-chart";
import StackedAvatar from "../StackedAvatar/stacked-avatar";
interface InsightPageCardProps {
  title: string;
  members: DbContribution[];
  repoList: RepoList[];
  openPrsCount?: number;
  closedPrsCount?: number;
  draftPrsCount?: number;
  mergedPrsCount?: number;
}

const InsightPageCard = ({
  title,
  members,
  repoList,
  openPrsCount,
  closedPrsCount,
  mergedPrsCount,
  draftPrsCount
}: InsightPageCardProps): JSX.Element => {
  const PieChartData: PieData[] = [
    {
      label: "open",
      value: openPrsCount || 0,
      id: "open",
      color: "hsla(131, 41%, 46%, 1)"
    },
    {
      label: "merged",
      value: mergedPrsCount || 0,
      id: "merged",
      color: "hsla(272, 51%, 54%, 1)"
    },
    {
      label: "closed",
      value: closedPrsCount || 0,
      id: "closed",
      color: "hsla(11, 89%, 54%, 1)"
    },
    {
      label: "draft",
      value: draftPrsCount || 0,
      id: "draft",
      color: "hsla(205, 11%, 78%, 1)"
    }
  ];

  const totalPrs = (openPrsCount || 0 )+ (closedPrsCount || 0 )+ (draftPrsCount || 0 )+ (mergedPrsCount || 0);
  return (
    <div className=" w-[428px] py-[15px] px-[14px] rounded-lg flex flex-col gap-y-3 bg-white border">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <div className="items-center flex">
          {members.length > 0 ? <StackedAvatar contributors={members}/> : "-"}
          {members.length >= 2 ? <div>&nbsp;{`+${members.length - 2} members`}</div> : ""}
        </div>
      </div>

      {/* Card body */}
      <div>
        <PieChart data={PieChartData} />
      </div>
      <div className="mt-4">
        <CardRepoList repoList={repoList} />
      </div>

      {/* Card footer */}
      <div className="flex mt-4 justify-between">
        <Button className="!w-48" type="outline">Copy Link</Button>
        <Button className="!w-48" type="primary">Go to Insight Page</Button>
      </div>
    </div>
  );
};

export default InsightPageCard;
