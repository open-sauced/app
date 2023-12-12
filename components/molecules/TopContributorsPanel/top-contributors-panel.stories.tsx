import { Meta, StoryFn } from "@storybook/react";
import TopContributorsPanel from "components/molecules/TopContributorsPanel/top-contributors-panel";

const storyConfig = {
  title: "Design System/Molecules/TopContributorsPanel",
} as Meta<typeof TopContributorsPanel>;

export default storyConfig;

const TopContributorsPanelTemplate: StoryFn<typeof TopContributorsPanel> = (args) => <TopContributorsPanel {...args} />;

export const Default = TopContributorsPanelTemplate.bind({});

Default.args = {
  loggedInUserLogin: "ogdev-01",
};
