import { action } from "@storybook/addon-actions";
import { SplitButton } from "./SplitButton";

export default {
  title: "Components/SplitButton",
  component: SplitButton,
  argTypes: {
    actions: {
      control: "object",
      description: "Array of actions with label and onClick function",
    },
  },
};

const createAction = (label: string) => ({
  label,
  onClick: action(`${label} clicked`),
});

export const Default = {
  args: {
    actions: [createAction("Action 1"), createAction("Action 2"), createAction("Action 3")],
  },
};

export const SingleOption = {
  args: {
    actions: [createAction("Only Option")],
  },
};

export const LongLabels = {
  args: {
    actions: [
      createAction("This is a very long action label"),
      createAction("Another lengthy option here"),
      createAction("Yet another extended choice"),
    ],
  },
};
