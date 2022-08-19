import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";

const storyConfig = {
  title: "Design System/Molecules/Card Horizontal Bar",
  component: "CardHorizontalBar"
};

export default storyConfig;

//Card Template
const CardHorizontalBarTemplate: ComponentStory<typeof CardHorizontalBarChart> = (args) => <CardHorizontalBarChart />;

export const Default = CardHorizontalBarTemplate.bind({});

Default.args = {
  children: <>Test</>
};