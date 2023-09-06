import React from "react";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { GoClock, GoGitPullRequest } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import clsx from "clsx";

import Card from "components/atoms/Card/card";
import CardLineChart from "../CardLineChart/card-line-chart";

interface InsightsCardProps {
  title: string;
  value?: number | string;
  numberChanged?: number;
  label: string | number;
  chart?: { series: any[] };
}
const Icons = {
  commit: <RiGitRepositoryCommitsLine className="" />,
  newContributors: <HiPlus className="" />,
  pullRequests: <GoGitPullRequest className="" />,
  alumniContributors: <GoClock className="" />,
  activeContributors: <TfiReload className="" />,
} as const;

const getIconColorClassNames = (title: string) => {
  switch (title.toLowerCase()) {
    case "pull requests":
      return "bg-purple-200 text-purple-500";
    case "active contributors":
      return "bg-green-200 text-green-500";
    case "new contributors":
      return "bg-blue-200 text-sky-500";
    case "alumni contributors":
      return "bg-amber-200 text-amber-500";
    default:
      return "bg-purple-200";
  }
};

const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "pull requests":
      return <RiGitRepositoryCommitsLine className="" />;
    case "active contributors":
      return <TfiReload className="" />;
    case "new contributors":
      return <HiPlus className="" />;
    case "alumni contributors":
      return <GoClock className="" />;

    default:
      return <RiGitRepositoryCommitsLine className="" />;
  }
};

const getChartLineColor = (title: string) => {
  switch (title.toLowerCase()) {
    case "active contributors":
      return "#22C55E";
    case "new contributors":
      return "#38BDF8";
    case "alumni contributors":
      return "#FBBF24";
    default:
      return "#8C54FF";
  }
};

const InsightsCard = ({ title, value, numberChanged, chart, label }: InsightsCardProps) => {
  const chartLineColor = getChartLineColor(title);

  const chartOption = {
    ...chart,
    series: [
      {
        ...chart?.series[0],
        lineStyle: {
          color: chartLineColor,
          shadowColor: chartLineColor,
          shadowBlur: 25,
          shadowOffsetY: 15,
          width: 1.5,
        },
        areaStyle: {
          color: "#ffff",
          opacity: 0.3,
        },
      },
    ],
  };

  return (
    <Card className="flex flex-col flex-1 w-full h-auto text-light-slate-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2 text-sm">
          <div className={clsx("p-1.5 rounded-full w-max text-base", getIconColorClassNames(title))}>
            {getIcon(title)}
          </div>
          {title}
        </div>
        <div className="flex items-center text-sm">{numberChanged ?? 0}</div>
      </div>

      <div className="flex flex-col items-center justify-center pt-6 pb-8">
        <h3 className="text-3xl font-semibold">{value ?? 0}</h3>
        <span>{label}</span>
      </div>

      {chart && (
        <div className="h-[78px] -mt-20 overflow-hidden">
          <CardLineChart className="" lineChartOption={chartOption} />
        </div>
      )}
    </Card>
  );
};

export default InsightsCard;
