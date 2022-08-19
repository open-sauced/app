import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";

const storyConfig = {
  title: "Design System/Molecules/Card Horizontal Bar",
  component: "CardHorizontalBar"
};

export default storyConfig;

const testLanguageList = [
  {
    languageName: "javascript",
    percentageUsed: 100
  }
];

//CardHorizontalBarChart Template
const CardHorizontalBarTemplate: ComponentStory<typeof CardHorizontalBarChart> = (args) => <CardHorizontalBarChart {...args} />;

export const Default = CardHorizontalBarTemplate.bind({});

Default.args = {
  languagesUsed: testLanguageList
};