import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { UsersIcon } from "@heroicons/react/24/solid";
import SidebarMenuItem from "./sidebar-menu-item";

const meta: Meta<typeof SidebarMenuItem> = {
  title: "Design System/Sidebar/SidebarMenuItem",
  component: SidebarMenuItem,
  argTypes: {
    type: {
      options: ["repo", "list"],
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarMenuItem>;

const baseProps: ComponentProps<typeof SidebarMenuItem> = {
  title: "My New List",
  url: "/dashboard",
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

export const IsActive: Story = {
  args: { ...baseProps, type: "list", isActive: true },
};
