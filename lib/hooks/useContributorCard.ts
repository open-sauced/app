import TestRepoAvatar from "public/icons/test-repo-avatar.svg";

const useContributorCard = () => {
  const lineChart  = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "darkgray"
      },
      data: ["Jan 2022", "Mar 2022", "Jun 2022"]
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
      axisLabel: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
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
          color: "#FFB74D",
          opacity: 0.6
        }
      }
    ]
  };

  const profile = {
    githubAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    githubName: "ChadStewart",
    totalPRs: 4,
    dateOfFirstPR: "3mo"
  };

  const repoList = [
    {
      repoName: "test",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test2",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test3",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test4",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test5",
      repoIcon: TestRepoAvatar
    },
    {
      repoName: "test6",
      repoIcon: TestRepoAvatar
    }
  ];

  return {
    lineChart,
    profile,
    repoList
  };
};

export default useContributorCard;