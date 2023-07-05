import { ComponentStory } from "@storybook/react";
import AuthContentWrapper from "components/molecules/AuthContentWrapper/auth-content-wrapper";

import Dashboard from "components/organisms/Dashboard/dashboard";
import Repositories from "components/organisms/Repositories/repositories";
import ReportsHistory from "components/molecules/ReportsHistory/reports-history";

import type { Report } from "interfaces/report-type";

const storyConfig = {
  title: "Design System/Molecules/Auth Content Wrapper"
};

export default storyConfig;

const AuthContentWrapperTemplateWithDashboard: ComponentStory<typeof AuthContentWrapper> = (args) => (
  <AuthContentWrapper {...args}>
    <Dashboard />
  </AuthContentWrapper>
);

export const WithDashboard = AuthContentWrapperTemplateWithDashboard.bind({});

const AuthContentWrapperTemplateWithRepositories: ComponentStory<typeof AuthContentWrapper> = (args) => (
  <AuthContentWrapper {...args}>
    <Repositories />
  </AuthContentWrapper>
);

export const WithRepositories = AuthContentWrapperTemplateWithRepositories.bind({});

const testReportList: Report[] = [
  { reportName: "Top Ten", reportDate: "Jun 3, 2022", reportFormat: "CSV" },
  { reportName: "Top Ten", reportDate: "Jun 3, 2022", reportFormat: "CSV" },
  { reportName: "Top Ten", reportDate: "Jun 3, 2022", reportFormat: "CSV" },
  { reportName: "Top Ten", reportDate: "Jun 3, 2022", reportFormat: "CSV" },
  { reportName: "Top Ten", reportDate: "Jun 3, 2022", reportFormat: "CSV" }
];

const AuthContentWrapperTemplateWithReportsHistory: ComponentStory<typeof ReportsHistory> = (args) => (
  <AuthContentWrapper>  
    <ReportsHistory {...args}/>
  </AuthContentWrapper>
);

export const WithReportsHistory = AuthContentWrapperTemplateWithReportsHistory.bind({});

WithReportsHistory.args = {
  reportList: testReportList
};