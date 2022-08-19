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
    languageName: "typescript",
    percentageUsed: 50
  },
  {
    languageName: "javascript",
    percentageUsed: 80
  }
];

//CardHorizontalBarChart Template
const CardHorizontalBarTemplate: ComponentStory<typeof CardHorizontalBarChart> = (args) => <CardHorizontalBarChart {...args} />;

export const OneLanguage = CardHorizontalBarTemplate.bind({});

OneLanguage.args = {
  languagesUsed: [
    {
      languageName: "javascript",
      percentageUsed: 100
    }
  ]
};

export const MultipleLanguages = CardHorizontalBarTemplate.bind({});

MultipleLanguages.args = {
  languagesUsed: testLanguageList
};