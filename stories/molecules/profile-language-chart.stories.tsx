import { Meta, StoryObj } from "@storybook/react";

import ProfileLanguageChart from "components/molecules/ProfileLanguageChart/profile-language-chart";
import { testLanguageList } from "stories/testData/mockedData";

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
    languageList: testLanguageList,
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
