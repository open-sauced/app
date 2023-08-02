import { ComponentStory } from "@storybook/react";
import Avatar from "../../components/atoms/Avatar/avatar";

const storyConfig = {
  title: "Design System/Atoms/Avatar",

  argTypes: {
    size: {
      options: ["sm", "base", "lg"],
      control: { type: "select" },
    },
    hasBorder: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
};

export default storyConfig;

const AvatarTemplate: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = AvatarTemplate.bind({});
Default.args = {
  size: "base",
  hasBorder: false,
  avatarURL:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  initials: "BD",
  alt: "Hello",
};

export const HasBorder = AvatarTemplate.bind({});
HasBorder.args = {
  size: "base",
  hasBorder: true,
  avatarURL:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  initials: "BD",
  alt: "Hello",
};

export const NoURL = AvatarTemplate.bind({});
NoURL.args = { size: "base", hasBorder: true, initials: "BD", alt: "Hello" };

export const CustomAvatar = AvatarTemplate.bind({});
CustomAvatar.args = {
  size: 56,
  hasBorder: true,
  avatarURL:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  initials: "BD",
  alt: "Hello",
};
