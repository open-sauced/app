import { useEffect, useState } from "react";
import { getCommitsLast30Days } from "lib/utils/get-recent-commits";

import useContributorData from "./useContributorData";

const lineChart = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLabel: false,
    // data: []
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
      // data: [],
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

const useTopicContributorCommits = (contributor: string, topic = "hacktoberfest") => {
  const contributorData = useContributorData();
  const [chart, setChart] = useState(lineChart);

  async function loadData() {
    const baseEndpoint = `${process.env.NEXT_PUBLIC_GS_API_URL}/${topic}/${contributor}/commits`;
    const endpointString = `${baseEndpoint}`;

    try {
      const resp = await fetch(endpointString, {
        method: "GET",
      });

      const data: { data: DbRepoCommit[] } = await resp.json();
      const graphData = getCommitsLast30Days(data.data);

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
    } catch (e) {
      // show an alert
    }
  }

  useEffect(() => {
    if (contributor) {
      loadData();
    }
  }, [contributor]);

  return {
    chart,
  };
};

export { useTopicContributorCommits };
