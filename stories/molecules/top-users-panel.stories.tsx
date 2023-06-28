import { ComponentMeta, ComponentStory } from "@storybook/react";
import TopUsersPanel from "components/molecules/TopUsersPanel/top-user-panel";

const storyConfig = {
  title: "Design System/Molecules/TopUsersPanel",
} as ComponentMeta<typeof TopUsersPanel>;

export default storyConfig;

const sampleUsers = [
  { username: "bdougie", following: true },
  { username: "diivi", following: false },
  { username: "ogdev-01", following: false },
  { username: "brandonroberts", following: true },
];

const TopUsersPanelTemplate: ComponentStory<typeof TopUsersPanel> = (args) => <TopUsersPanel {...args} />;

export const Default = TopUsersPanelTemplate.bind({});

Default.args = {
  users: sampleUsers,
};
