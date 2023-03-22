import { ComponentStory } from "@storybook/react";
import TeamMemberRow from "components/molecules/TeamMemberRow/team-member-row";

const storyConfig = {
  title: "Design System/Molecules/Team Member Row",
  component: "TeamMemberRow"
};

export default storyConfig;

//TextInput Template
const TeamMemberRowTemplate: ComponentStory<typeof TeamMemberRow> = (args) => <TeamMemberRow {...args} />;

export const Default = TeamMemberRowTemplate.bind({});
export const Editor = TeamMemberRowTemplate.bind({});
export const Viewer = TeamMemberRowTemplate.bind({});
export const Pending = TeamMemberRowTemplate.bind({});

Default.args = {
  className: "max-w-2xl",
  name: "John Doe",
  avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
  role: "admin"
};
Editor.args = {
  className: "max-w-2xl",
  name: "John Doe",
  avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
  role: "editor"
};
Viewer.args = {
  className: "max-w-2xl",
  name: "John Doe",
  avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
  role: "viewer"
};
Pending.args = {
  className: "max-w-2xl",
  name: "John Doe",
  avatarUrl: "https://avatars.githubusercontent.com/u/7252105?v=4",
  role: "pending"
};
