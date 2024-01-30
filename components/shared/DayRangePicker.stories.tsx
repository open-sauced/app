import { Meta, StoryObj } from "@storybook/react";
import { DayRangePicker } from "./DayRangePicker";

type Story = StoryObj<typeof DayRangePicker>;

const meta: Meta<typeof DayRangePicker> = {
  title: "Components/Shared/Day Range Picker",
  component: DayRangePicker,
  args: {},
};

export default meta;

export const Default: Story = {};
