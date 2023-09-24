import { Meta, StoryObj } from "@storybook/react";
import CardHorizontalBarChart from "@components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import { testLanguageList } from "stories/testData/mockedData";

const storyConfig: Meta<typeof CardHorizontalBarChart> = {
  title: "Design System/Molecules/Card Horizontal Bar",
  component: CardHorizontalBarChart,
};

export default storyConfig;

type Story = StoryObj<typeof CardHorizontalBarChart>;

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
