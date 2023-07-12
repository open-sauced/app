import { Meta, StoryFn } from "@storybook/react";
import TopUsersPanel from "components/molecules/TopUsersPanel/top-user-panel";

const storyConfig = {
  title: "Design System/Molecules/TopUsersPanel",
} as Meta<typeof TopUsersPanel>;

export default storyConfig;

const sampleUsers = ["bdougie", "diivi", "ogdev-01", "brandonroberts"];

const TopUsersPanelTemplate: StoryFn<typeof TopUsersPanel> = (args) => <TopUsersPanel {...args} />;

export const Default = TopUsersPanelTemplate.bind({});

Default.args = {
  users: sampleUsers,
};
