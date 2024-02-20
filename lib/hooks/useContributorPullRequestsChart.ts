import { useEffect, useState } from "react";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import { getAvatarByUsername } from "lib/utils/github";
import getFormattedTooltipValue from "lib/utils/get-formatted-tooltip-value";
import { getPullRequestsHistogramToDays } from "lib/utils/get-prs-to-days";
import useContributorPullRequests from "./api/useContributorPullRequests";
import { usePullRequestsHistogram } from "./api/usePullRequestsHistogram";

const useContributorPullRequestsChart = (
  contributor: string,
  topic: string,
  repoIds: number[] = [],
  range = "30",
  mostRecent = false
) => {
  const lineChart = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: false,
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
      axisLabel: false,
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    grid: {
      height: 130,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800",
        },
        areaStyle: {
          color: "#FFB74D",
          opacity: 0.6,
        },
        clip: false,
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: getFormattedTooltipValue,
    },
  };

  const [chart, setChart] = useState(lineChart);
  const { data, meta } = useContributorPullRequests({ contributor, topic, repoIds, limit: 100, range, mostRecent });
  const repoList: RepoList[] = Array.from(new Set(data.map((prData) => prData.repo_name))).map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName: repoName,
      repoOwner,
      repoIcon: getAvatarByUsername(repoOwner),
    };
  });

  const { data: histogramData } = usePullRequestsHistogram({
    repoIds,
    range: Number(range),
    width: 1,
    contributor,
    direction: "ASC",
  });

  const chartData = getPullRequestsHistogramToDays(histogramData, Number(range));
  const totalPrs = chartData.reduce((total, curr) => total + curr.y, 0);

  useEffect(() => {
    if (chartData && Array.isArray(chartData) && chartData.length > 0) {
      const graphData = chartData.map((day) => {
        return {
          x: day.x,
          y: day.y,
        };
      });

      setChart((prevChart) => ({
        ...prevChart,
        xAxis: {
          ...prevChart.xAxis,
          data: graphData.map((commit) => `${commit.x}`),
        },
        series: prevChart.series.map((cs) => ({
          ...cs,
          data: graphData.map((commit) => commit.y),
        })),
      }));
    }
  }, [chartData]);

  return {
    chart,
    data,
    meta,
    repoList,
    totalPrs,
  };
};

export { useContributorPullRequestsChart };
