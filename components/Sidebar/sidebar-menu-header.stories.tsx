import { StoryObj, Meta } from "@storybook/react";
import SidebarMenuHeader from "./sidebar-menu-header";

const meta: Meta<typeof SidebarMenuHeader> = {
  title: "Design System/Sidebar/SidebarMenuHeader",
  component: SidebarMenuHeader,
};

export default meta;

type Story = StoryObj<typeof SidebarMenuHeader>;

export const Default: Story = {
  args: {
    children: "Your insights",
  },
};
