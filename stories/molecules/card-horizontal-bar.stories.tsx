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
    languageName: "TypeScript",
    percentageUsed: 50
  },
  {
    languageName: "JavaScript",
    percentageUsed: 20
  },
  {
    languageName: "Rust",
    percentageUsed: 30
  }
];

//CardHorizontalBarChart Template
const CardHorizontalBarTemplate: ComponentStory<typeof CardHorizontalBarChart> = (args) => <CardHorizontalBarChart {...args} />;

export const OneLanguage = CardHorizontalBarTemplate.bind({});

OneLanguage.args = {
  languageList: [
    {
      languageName: "JavaScript",
      percentageUsed: 100,
    },
  ],
};

export const MultipleLanguages = CardHorizontalBarTemplate.bind({});

MultipleLanguages.args = {
  languageList: testLanguageList,
};
export const notSupportedLanguage = CardHorizontalBarTemplate.bind({});

notSupportedLanguage.args = {
  languageList: [
    {
      languageName: "qBasic",
      percentageUsed: 100,
    },
  ],
};