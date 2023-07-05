import { ComponentStory } from "@storybook/react";
import AuthContentWrapper from "components/molecules/AuthContentWrapper/auth-content-wrapper";

import Dashboard from "components/organisms/Dashboard/dashboard";

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