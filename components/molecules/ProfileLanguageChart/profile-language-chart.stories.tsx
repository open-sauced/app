import { Meta, StoryObj } from "@storybook/react";

import ProfileLanguageChart from "components/molecules/ProfileLanguageChart/profile-language-chart";

const storyConfig = {
  title: "Design System/Molecules/Profile language chart",
  component: ProfileLanguageChart,
} satisfies Meta<typeof ProfileLanguageChart>;

export default storyConfig;

type Story = StoryObj<typeof ProfileLanguageChart>;

export const OneLanguage: Story = {
  args: {
    languageList: [
      {
        languageName: "JavaScript",
        percentageUsed: 100,
      },
    ],
  },
};

export const MultipleLanguages: Story = {
  args: {
    languageList: [
      {
        languageName: "TypeScript",
        percentageUsed: 50,
      },
      {
        languageName: "JavaScript",
        percentageUsed: 20,
      },
      {
        languageName: "Rust",
        percentageUsed: 15,
      },
      { languageName: "React", percentageUsed: 15 },
    ],
  },
};

export const NotSupportedLanguage: Story = {
  args: {
    languageList: [
      {
        languageName: "qBasic",
        percentageUsed: 100,
      },
    ],
  },
};
