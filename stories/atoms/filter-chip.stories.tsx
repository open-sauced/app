import { StoryObj, Meta } from "@storybook/react";
import FilterChip from "components/atoms/FilterChip/filter-chip";

export default {
  title: "Design System/Atoms/FilterChip",
  component: FilterChip,
} as Meta<typeof FilterChip>;

type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  args: {
    items: ["JavaScript"],
  },
};

export const MultipleItems: Story = {
  args: {
    items: ["JavaScript", "TypeScript", "Python"],
  },
};

export const LongItem: Story = {
  args: {
    items: ["open-sauced/insights", "react", "TypeScript", "Python"],
  },
};
