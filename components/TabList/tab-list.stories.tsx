import { Meta, StoryObj } from "@storybook/react";
import { SubTabsList } from "./tab-list";

type Story = StoryObj<typeof SubTabsList>;

const meta: Meta<typeof SubTabsList> = {
  title: "Components/Shared/SubTabsList",
  component: SubTabsList,
  args: {
    label: "Sub Tabs Example",
    textSize: "regular",
    tabList: [
      { name: "Tab 1", path: "tab1" },
      { name: "Tab 2", path: "tab2" },
      { name: "Tab 3", path: "tab3" },
    ],
    selectedTab: "tab 1",
  },
};

export default meta;

export const Default: Story = {};
export const SmallText: Story = {
  args: {
    textSize: "small",
  },
};
