import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { UsersIcon } from "@heroicons/react/24/solid";
import MenuItem from "./menu-item";

const meta: Meta<typeof MenuItem> = {
  title: "Design System/Sidebar/MenuItem",
  component: MenuItem,
  argTypes: {
    type: {
      options: ["repo", "list"],
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

const baseProps: ComponentProps<typeof MenuItem> = {
  title: "My New List",
  href: "/dashboard",
};

export const Default: Story = {
  args: { ...baseProps, icon: <UsersIcon className="w-5 h-5 text-slate-400" /> },
};

export const Repo: Story = {
  args: { ...baseProps, type: "repo" },
};

export const List: Story = {
  args: { ...baseProps, type: "list" },
};

export const Active: Story = {
  args: { ...baseProps, isActive: true, type: "list" },
};
