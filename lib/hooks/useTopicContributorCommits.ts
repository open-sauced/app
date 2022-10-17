import { useEffect, useState } from "react";
import useSWR from "swr";
import { getCommitsLast30Days } from "lib/utils/get-recent-commits";

interface PaginatedTopicCommitResponse {
  readonly data: DbRepoCommit[];
  readonly meta: Meta;
}
const useTopicContributorCommits = (contributor: string, topic = "hacktoberfest") => {
  const lineChart = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: false
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
      axisLabel: false,
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    grid: {
      height: 100,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800"
        },
        areaStyle: {
          color: "#FFB74D",
          opacity: 0.6
        }
      }
    ]
  };

  const [chart, setChart] = useState(lineChart);

  const baseEndpoint = `${topic}/${contributor}/commits`;
  const endpointString = `${baseEndpoint}`;

  const { data } = useSWR<PaginatedTopicCommitResponse, Error>(contributor ? endpointString : null);

  useEffect(() => {
    if (data) {
      const graphData = getCommitsLast30Days(data.data);

      setChart((prevChart) => ({
        ...prevChart,
        xAxis: {
          ...prevChart.xAxis,
          data: graphData.map((commit) => `${commit.x}`)
        },
        series: prevChart.series.map((cs) => ({
          ...cs,
          data: graphData.map((commit) => commit.y)
        }))
      }));
    }
  }, [data]);

  return {
    chart
  };
};

export { useTopicContributorCommits };
