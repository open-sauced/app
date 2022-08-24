import { useRepositoriesList } from "lib/hooks/useRepositoriesList";

const useDashBoardData = () => {
  const scatterOptions = {
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: "scatter"
      }
    ]
  };

  const areaChartOptions  = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Jan 2022", "Mar 2022", "Jun 2022"]
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800"
        },
        areaStyle: {
          color: "#ff9800"
        }
      }
    ]
  };

  const { repoList, isLoading } = useRepositoriesList();
  const repoListMetaData = repoList.meta;

  return {
    scatterOptions,
    areaChartOptions,
    repoListMetaData,
    isLoading
  };
};

export default useDashBoardData;