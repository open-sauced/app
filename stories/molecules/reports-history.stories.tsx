import { ComponentStory } from "@storybook/react";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";
import { Report } from "interfaces/report-type";

const storyConfig = {
  title: "Design System/Molecules/Reports History",
  component: "ReportsHistory"
};

export default storyConfig;

const testReportList: Report[] = [
  {
    reportName: "Top Ten",
    reportDate: "Jun 3, 2022",
    reportFormat: "CSV"
  },
  {
    reportName: "Top Five",
    reportDate: "Jun 3, 2022",
    reportFormat: "CSV"
  }
];

//ReportsHistory Template
const ReportsHistoryTemplate: ComponentStory<typeof ReportsHistory> = (args) => <ReportsHistory {...args} />;

export const Default = ReportsHistoryTemplate.bind({});
export const NoReports = ReportsHistoryTemplate.bind({});

Default.args = {
  reportList: testReportList
};