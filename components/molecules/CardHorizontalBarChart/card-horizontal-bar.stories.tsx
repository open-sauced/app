import { Meta, StoryObj } from "@storybook/react";
import CardHorizontalBarChart from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";

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
