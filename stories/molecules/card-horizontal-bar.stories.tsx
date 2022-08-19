import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardHorizontalBar from "components/molecules/CardHorizontalBar/card-horizontal-bar";

const storyConfig = {
  title: "Design System/Molecules/Card Horizontal Bar",
  component: "CardHorizontalBar"
};

export default storyConfig;

//Card Template
const CardHorizontalBarTemplate: ComponentStory<typeof CardHorizontalBar> = (args) => <CardHorizontalBar />;

export const Default = CardHorizontalBarTemplate.bind({});

Default.args = {
  children: <>Test</>
};