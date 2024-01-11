import { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, ButtonGroupItem } from "./ButtonGroup";

type Story = StoryObj<typeof ButtonGroup>;

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Shared/ButtonGroup",
  component: ButtonGroup,
  args: {
    label: "This is a button group",
    children: [
      <ButtonGroupItem key="1" variant="primary">
        Organizations
      </ButtonGroupItem>,
      <ButtonGroupItem key="2">Repositories</ButtonGroupItem>,
      <ButtonGroupItem key="3">Contributors</ButtonGroupItem>,
    ],
  },
};

export default meta;

export const Default: Story = {};
