import { Meta, StoryFn } from "@storybook/react";
import ListNameHeader from "@components/atoms/ListNameHeader/list-name-header";

const meta: Meta<typeof ListNameHeader> = {
  title: "Design System/Atoms/ListNameHeader",
};
export default meta;

let title = "List Name";

// for testing purposes
const onEditTitle = (value: string) => {
  title = value;
};

const Template: StoryFn<typeof ListNameHeader> = (args) => <ListNameHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title,
  onEditTitle,
};
