import { ComponentStory } from "@storybook/react";
import Card from "../../components/atoms/Card/card";

const storyConfig = {
  title: "Design System/Atoms/Card",
  component: "Card"
};

export default storyConfig;

//Card Template
const CardTemplate: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = CardTemplate.bind({});
export const Heading = CardTemplate.bind({});

Default.args = {
  children: <>Test</>
};

Heading.args = {
  heading: "Test",
  children: <>Test</>
};