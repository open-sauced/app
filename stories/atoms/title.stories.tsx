import { ComponentStory } from "@storybook/react";
import Title from "../../components/atoms/Typography/title";

const storyConfig = {
  title: "Design System/Atoms/Title",
  component: "Title"
};

export default storyConfig;

//Title Template
const TitleTemplate: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = TitleTemplate.bind({});

Default.args = {
  children: "Test",
  level: 1
};