import { useEffect, useState } from "react";
import differenceInDays from "date-fns/differenceInDays";
import getPullRequestsToDays from "lib/utils/get-prs-to-days";
import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import { getAvatarByUsername } from "lib/utils/github";
import getFormattedTooltipValue from "lib/utils/get-formatted-tooltip-value";
import useContributorPullRequests from "./api/useContributorPullRequests";

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
  const repoList: RepoList[] = Array.from(
    new Set(
      data
        .filter((prSince) => {
          const daysSinceUpdated = differenceInDays(new Date(), new Date(prSince.pr_updated_at));
          return daysSinceUpdated <= Number(range);
        })
        .map((prData) => prData.repo_name)
    )
  ).map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName: repoName,
      repoOwner,
      repoIcon: getAvatarByUsername(repoOwner),
    };
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const graphData = getPullRequestsToDays(data, Number(range || "30"));

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
  }, [data, range]);

  return {
    chart,
    data,
    meta,
    repoList,
  };
};

export { useContributorPullRequestsChart };
