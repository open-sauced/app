import type { Meta, StoryFn } from "@storybook/react";
import Text from "../../components/atoms/Typography/text";

const meta: Meta<typeof Text> = {
  title: "Design System/Atoms/Typography/Text",
  component: Text,
  argTypes: {
    type: {
      options: ["default", "secondary", "success", "warning", "danger"],
      control: { type: "select" },
    },
  },
};

export default meta;

//Text Template
const TextTemplate: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Default = TextTemplate.bind({});

Default.args = {
  children: "Test",
  strong: false,
  type: "default",
  strikethrough: false,
  underline: false,
  small: false,
  disabled: false,
};
