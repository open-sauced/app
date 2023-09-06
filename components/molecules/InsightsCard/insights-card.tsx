import React from "react";

import { BsFillArrowUpCircleFill } from "react-icons/bs";
import clsx from "clsx";

import Card from "components/atoms/Card/card";
import CardLineChart from "../CardLineChart/card-line-chart";

interface InsightsCardProps {
  icon?: JSX.Element;
  title: string;
  value?: number | string;
  numberChanged?: number;
  label: string | number;
  chart?: { series: any[] };
}

type titleType = "pull requests" | "active contributors" | "new contributors" | "alumni contributors";

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

const InsightsCard = ({ icon, title, value, numberChanged, chart, label }: InsightsCardProps) => {
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
          <div className={clsx("p-1.5 rounded-full w-max text-base", getIconColorClassNames(title))}>{icon}</div>
          {title}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {numberChanged ?? 0} <BsFillArrowUpCircleFill className="text-base text-green-600" />
        </div>
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
