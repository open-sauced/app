import { ComponentStory } from "@storybook/react";
import Spinner from "components/atoms/Spinner/spinner";

const storyConfig = {
  title: "Design System/Atoms/Spinner"
};
export default storyConfig;

const SpinnerTemplate: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const SpinnerStory = SpinnerTemplate.bind({});
