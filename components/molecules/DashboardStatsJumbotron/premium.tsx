import React from "react";

import { DashboardProps } from "components/organisms/Dashboard/dashboard";
import { useFetchInsightsContributors } from "lib/hooks/api/useInsights";
import InsightsCard from "../InsightsCard/insights-card";

interface PremiumStatsProps extends DashboardProps {
  prs?: DbRepoPR[];
}
const PremiumStats = ({ repositories, prs }: PremiumStatsProps) => {
  const { data: newContributors, meta: newContributorsMeta } = useFetchInsightsContributors(repositories, "new");
  const { data: activeContributors, meta: activeContributorsMeta } = useFetchInsightsContributors(
    repositories,
    "recent"
  );
  const { data: alumniContributors, meta: alumniContributorsMeta } = useFetchInsightsContributors(
    repositories,
    "churn"
  );

  const lineChart = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: false,
    },
    yAxis: {
      type: "value",
      axisLabel: false,
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    grid: {
      height: 100,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    series: [
      {
        data: [820, 732, 1000, 834, 1290, 620, 1900],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800",
          shadowColor: "#ff9800",
          shadowBlur: 25,
          shadowOffsetY: 15,
        },
        areaStyle: {
          color: "#ffff",
          opacity: 0.3,
        },
      },
    ],
  };
  return (
    <section className="flex flex-wrap items-stretch max-w-full gap-4 lg:flex-nowrap">
      <InsightsCard title="Pull Requests" label="In the last 30d" value={String(prs?.length ?? 0)} />
      <InsightsCard
        title="Active Contributors"
        label={"0"}
        value={activeContributorsMeta.itemCount}
        chart={lineChart}
      />
      <InsightsCard title="New Contributors" label={"0"} value={newContributorsMeta.itemCount} chart={lineChart} />
      <InsightsCard
        title="Alumni Contributors"
        label={"0"}
        value={String(alumniContributorsMeta.itemCount)}
        chart={lineChart}
      />
    </section>
  );
};

export default PremiumStats;
