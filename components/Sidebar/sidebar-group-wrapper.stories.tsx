import { StoryObj, Meta } from "@storybook/react";
import SidebarGroupWrapper from "./sidebar-group-wrapper";
import SidebarMenuItem from "./sidebar-menu-item";
import SidebarMenuHeader from "./sidebar-menu-header";

const meta: Meta<typeof SidebarGroupWrapper> = {
  title: "Design System/Sidebar/SidebarGroupWrapper",
  component: SidebarGroupWrapper,
  argTypes: {
    isLoading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarGroupWrapper>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SidebarMenuHeader>Your insights</SidebarMenuHeader>
        <SidebarMenuItem title="Dashboard" href="/dashboard" type="list" />
        <SidebarMenuItem title="Repositories" href="/repositories" type="repo" isActive />
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
