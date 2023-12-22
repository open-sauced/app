import { StoryObj, Meta } from "@storybook/react";
import SidebarWrapper from "./sidebar-wrapper";
import SidebarMenuItem from "./sidebar-menu-item";
import MenuHeader from "./sidebar-menu-header";
import SidebarGroupWrapper from "./sidebar-group-wrapper";

const meta: Meta<typeof SidebarWrapper> = {
  title: "Design System/Sidebar/SidebarWrapper",
  component: SidebarWrapper,
};

export default meta;

type Story = StoryObj<typeof SidebarWrapper>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuHeader>Your insights</MenuHeader>
        <SidebarGroupWrapper>
          <SidebarMenuItem title="Dashboard" href="/dashboard" type="list" />
          <SidebarMenuItem title="Repositories" href="/repositories" type="repo" />
        </SidebarGroupWrapper>

        <MenuHeader>Shared with you</MenuHeader>
        <SidebarGroupWrapper>
          <SidebarMenuItem title="Javascript frameworks" href="/community" type="repo" />
          <SidebarMenuItem title="Staff Picks" href="/trending" type="repo" />
          <SidebarMenuItem title="Potential Hires" href="/trending" type="repo" />
        </SidebarGroupWrapper>
      </>
    ),
  },
};

export const WithActiveItem: Story = {
  args: {
    children: (
      <>
        <MenuHeader>Your insights</MenuHeader>
        <SidebarGroupWrapper>
          <SidebarMenuItem title="Dashboard" href="/dashboard" type="list" isActive />
          <SidebarMenuItem title="Repositories" href="/repositories" type="repo" />
        </SidebarGroupWrapper>

        <MenuHeader>Shared with you</MenuHeader>
        <SidebarGroupWrapper>
          <SidebarMenuItem title="Javascript frameworks" href="/community" type="repo" />
          <SidebarMenuItem title="Staff Picks" href="/trending" type="repo" />
          <SidebarMenuItem title="Potential Hires" href="/trending" type="repo" />
        </SidebarGroupWrapper>
      </>
    ),
  },
};

export const WithLoading: Story = {
  args: {
    children: (
      <>
        <MenuHeader>Your insights</MenuHeader>
        <SidebarGroupWrapper>
          <SidebarMenuItem title="Dashboard" href="/dashboard" type="list" />
          <SidebarMenuItem title="Repositories" href="/repositories" type="repo" />
        </SidebarGroupWrapper>

        <MenuHeader>Shared with you</MenuHeader>
        <SidebarGroupWrapper isLoading>
          <SidebarMenuItem title="Javascript frameworks" href="/community" type="repo" />
          <SidebarMenuItem title="Staff Picks" href="/trending" type="repo" />
          <SidebarMenuItem title="Potential Hires" href="/trending" type="repo" />
        </SidebarGroupWrapper>
      </>
    ),
  },
};
