import { ComponentStory } from "@storybook/react";
import TeamMembersConfig from "components/molecules/TeamMembersConfig/team-members-config";

const storyConfig = {
  title: "Design System/Molecules/Team Members Config",
  component: "TeamMembersConfig"
};

export default storyConfig;

//TextInput Template
const TeamMembersTemplate: ComponentStory<typeof TeamMembersConfig> = (args) => <TeamMembersConfig {...args} />;

export const Default = TeamMembersTemplate.bind({});

Default.args = {
  members: [
    {
      name: "John Doe",
      avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
      role: "admin"
    },
    {
      name: "John Cena",
      avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
      role: "editor"
    },
    {
      name: "John Wick",
      avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
      role: "viewer"
    }
  ]
};
