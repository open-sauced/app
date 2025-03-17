import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import SingleSelect from "./single-select";

type Story = StoryObj<typeof SingleSelect>;

const meta: Meta<typeof SingleSelect> = {
  title: "Design System/Atoms/SingleSelect",
  component: SingleSelect,
  argTypes: {
    position: {
      options: ["popper", "item-aligned"],
      control: { type: "radio" },
    },
    isSearchable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

const baseProps: ComponentProps<typeof SingleSelect> = {
  options: [
    {
      label: "A label",
      value: "A value",
    },
    {
      label: "Another label",
      value: "Another value",
    },
  ],
  value: "A value",
  position: "popper",
  placeholder: "A placeholder",
  onValueChange: (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
  labelText: "Accessible label",
};

export const Default: Story = {
  args: baseProps,
};

export const Empty: Story = {
  args: { ...baseProps, options: [] },
};

export const WithSearch: Story = {
  args: { ...baseProps, isSearchable: true },
};

export const WithInsetLabel: Story = {
  args: { ...baseProps, insetLabel: "Inset label" },
};
