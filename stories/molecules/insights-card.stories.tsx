import { StoryFn, Meta } from "@storybook/react";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { GoGitPullRequest, GoClock } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import InsightsCard from "components/molecules/InsightsCard/insights-card";

export default {
  title: "Design System/Molecules/Insights Card",
} as Meta<typeof InsightsCard>;

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

const testIcons = {
  commit: <RiGitRepositoryCommitsLine className="" />,
  newContributors: <HiPlus className="" />,
  pullRequests: <GoGitPullRequest className="" />,
  churnedContributors: <GoClock className="" />,
  activeContributors: <TfiReload className="" />,
};

const Template: StoryFn<typeof InsightsCard> = (args) => <InsightsCard {...args} />;

export const Default = Template.bind({});
export const ActiveContributors = Template.bind({});
export const NewContributors = Template.bind({});
export const ChurnedContributors = Template.bind({});

Default.args = {
  title: "Pull Requests",
  value: 34,
  numberChanged: 76,
  icon: testIcons["pullRequests"],
  label: "in the last 30d",
  // chart: lineChart,
};

ActiveContributors.args = {
  title: "Active Contributors",
  value: 69,
  numberChanged: 76,
  icon: testIcons["activeContributors"],
  label: 221,
  chart: lineChart,
};

NewContributors.args = {
  title: "New Contributors",
  value: "69%",
  numberChanged: 76,
  icon: testIcons["newContributors"],
  label: 221,
  chart: lineChart,
};

ChurnedContributors.args = {
  title: "Churned Contributors",
  value: 69,
  numberChanged: 76,
  icon: testIcons["churnedContributors"],
  label: 221,
  chart: lineChart,
};
