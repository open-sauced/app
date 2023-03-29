import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import ProfileLanguageChart from "components/molecules/ProfileLanguageChart/profile-language-chart";
const storyConfig = {
  title: "Design System/Molecules/Profile language chart"
};

export default storyConfig;

export const testLanguageList = [
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
  },
  { languageName: "Go", percentageUsed: 15 },
  { languageName: "Golo", percentageUsed: 15 }
];

//CardHorizontalBarChart Template
const ProfileLanguageChartTemplate: ComponentStory<typeof ProfileLanguageChart> = (args) => (
  <TooltipProvider>
    <ProfileLanguageChart {...args} />
  </TooltipProvider>
);

export const OneLanguage = ProfileLanguageChartTemplate.bind({});

OneLanguage.args = {
  languageList: [
    {
      languageName: "JavaScript",
      percentageUsed: 100
    }
  ]
};

export const MultipleLanguages = ProfileLanguageChartTemplate.bind({});

MultipleLanguages.args = {
  languageList: testLanguageList
};
export const notSupportedLanguage = ProfileLanguageChartTemplate.bind({});

notSupportedLanguage.args = {
  languageList: [
    {
      languageName: "qBasic",
      percentageUsed: 100
    }
  ]
};
