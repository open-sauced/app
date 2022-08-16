import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";

const storyConfig = {
  title: "Design System/Molecules/Reports History",
  component: "ReportsHistory"
};

export default storyConfig;

//ReportsHistory Template
const ReportsHistoryTemplate: ComponentStory<typeof ReportsHistory> = () => <ReportsHistory />;

export const Default = ReportsHistory.bind({});

/* Default.args = {
  children: <>Test</>
}; */