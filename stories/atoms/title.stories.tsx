import type { Meta, StoryFn } from "@storybook/react";
import Title from "../../components/atoms/Typography/title";

const meta: Meta = {
  title: "Design System/Atoms/Typography/Title",
  component: Title,
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5],
      control: { type: "select" },
    },
  },
};

export default meta;

//Title Template
const TitleTemplate: StoryFn<typeof Title> = (args) => <Title {...args} />;

export const Default = TitleTemplate.bind({});

Default.args = {
  children: "Test",
  level: 1,
};
