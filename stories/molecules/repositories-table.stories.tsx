import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RepositoriesTable from "../../components/molecules/RepositoriesTable/repositories-table";

const storyConfig = {
  title: "Design System/Molecules/Repositories Table",
  component: "RepositoriesTable"
};

export default storyConfig;

// SelectableTable Template
const RepositoriesTableTemplate: ComponentStory<typeof RepositoriesTable> = (args) => <RepositoriesTable {...args} />;

// SelectableTable Default
export const Default = RepositoriesTableTemplate.bind({});

const previewRepositories = [
  {
    name: "Insights",
    handle: "opensauced",
    activity: "High",
    prOverview: {
      open: 10,
      merged: 2,
      closed: 3,
      draft: 8,
      churn: 40,
      churnDirection: "up"
    }
  },
  {
    name: "cli",
    handle: "npm",
    activity: "High",
    prOverview: {
      open: 2,
      merged: 0,
      closed: 0,
      draft: 1,
      churn: 100,
      churnDirection: "down"
    }
  },
  {
    name: "flowy",
    handle: "alyssaxuu",
    activity: "High",
    prOverview: {
      open: 80,
      merged: 15,
      closed: 4,
      draft: 0,
      churn: 20,
      churnDirection: "up"
    }
  }
];

Default.args = {
  listOfRepositories: previewRepositories
};
