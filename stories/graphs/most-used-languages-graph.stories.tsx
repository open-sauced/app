import { MostUsedLanguagesGraph } from "components/Graphs/MostUsedLanguagesGraph/most-used-languages-graph";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof MostUsedLanguagesGraph>;

const meta: MetaData = {
  title: "Components/Graphs/Most Used Languages Graph",
  component: MostUsedLanguagesGraph,
};

export default meta;
type Story = StoryObj<typeof MostUsedLanguagesGraph>;

function generateData() {
  return [
    {
      name: "Python",
      value: 10000,
    },
    {
      name: "TypeScript",
      value: 250,
    },
    {
      name: "JavaScript",
      value: 2000,
    },
    {
      name: "C++",
      value: 1500,
    },
    {
      name: "Zig",
      value: 3000,
    },
  ];
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

export const Loading: Story = {
  args: {
    isLoading: true,
    data: generateData(),
    contributorType: "all",
    setContributorType(type) {
      // eslint-disable-next-line no-console
      console.log(type);
    },
  },
};
