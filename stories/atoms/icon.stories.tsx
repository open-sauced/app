import { ComponentStory } from "@storybook/react";
import ForkIcon from "img/icons/fork-icon.svg";
import Icon from "../../components/atoms/Icon/icon";

const storyConfig = {
  title: "Design System/Atoms/Icon",
  component: "Icon Button"
};

export default storyConfig;

//Icon Template
const IconTemplate: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = IconTemplate.bind({});
Default.args = { IconImage: ForkIcon };
