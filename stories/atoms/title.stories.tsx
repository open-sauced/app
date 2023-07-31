import type { Meta, StoryObj } from "@storybook/react";
import Title from "../../components/atoms/Typography/title";

const meta: Meta = {
  title: "Design System/Atoms/Typography/Title",
  component: Title,
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5],
      control: { type: "select" },
    },
    weight: {
      options: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Title> = {
  args: {
    children: "Test",
    level: 1,
  },
};
