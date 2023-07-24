import { useEffect, useState } from "react";
import getPullRequestsToDays from "lib/utils/get-prs-to-days";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import { getAvatarByUsername } from "lib/utils/github";
import getFormattedTooltipValue from "lib/utils/get-formatted-tooltip-value";
import useContributorPullRequests from "./api/useContributorPullRequests";

const useContributorPullRequestsChart = (contributor: string, topic: string, repoIds: number[] = [], range = 30) => {
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
      height: 100,
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
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: getFormattedTooltipValue,
    },
  };

  const [chart, setChart] = useState(lineChart);
  const { data, meta } = useContributorPullRequests(contributor, topic, repoIds, 100, range);
  const repoList: RepoList[] = Array.from(new Set(data.map((prData) => prData.full_name))).map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName: repoName,
      repoOwner,
      repoIcon: getAvatarByUsername(repoOwner),
    };
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const graphData = getPullRequestsToDays(data);

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
  }, [data]);

  return {
    chart,
    data,
    meta,
    repoList,
  };
};

export { useContributorPullRequestsChart };
