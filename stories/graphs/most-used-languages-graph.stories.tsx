import { MostUsedLanguagesGraph } from "components/Graphs/most-used-languages-graph";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof MostUsedLanguagesGraph>;

const meta: MetaData = {
  title: "Components/Graphs/Most Used Languages Graph",
  component: MostUsedLanguagesGraph,
};

export default meta;
type Story = StoryObj<typeof MostUsedLanguagesGraph>;

function generateData() {
  return {
    mainLanguage: "TypeScript",
    data: [
      {
        name: "Python",
        value: 10,
      },
      {
        name: "TypeScript",
        value: 25,
      },
      {
        name: "JavaScript",
        value: 20,
      },
      {
        name: "C++",
        value: 15,
      },
      {
        name: "Zig",
        value: 30,
      },
    ],
  };
}

export const Default: Story = {
  args: {
    data: generateData(),
    contributorType: "all",
    setContributorType(type) {
      // eslint-disable-next-line no-console
      console.log(type);
    },
  },
};
