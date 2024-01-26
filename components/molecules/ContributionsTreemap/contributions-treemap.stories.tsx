import { Meta, StoryObj } from "@storybook/react";
import { getGraphColorPalette } from "lib/utils/color-utils";
import { ContributionsTreemap } from "./contributions-treemap";

type Story = StoryObj<typeof ContributionsTreemap>;

const meta: Meta<typeof ContributionsTreemap> = {
  title: "components/molecules/ContributionsTreemap",
  component: ContributionsTreemap,
};

export default meta;

export const Repositories: Story = {
  args: {
    data: {
      id: "root",
      children: [
        { id: "ngrx/platform", value: 2, repoId: "83716883" },
        { id: "analogjs/analog", value: 9, repoId: "511199000" },
      ],
    },
    color: getGraphColorPalette(),
    onClick: () => {},
    repoName: null,
    setRepoName: (repoName: string | null) => {},
    isLoading: false,
  },
};

export const Contributors: Story = {
  args: {
    data: {
      id: "root",
      children: [
        { id: "nickytonline", value: 0 },
        { id: "brandonroberts", value: 97 },
        { id: "BekahHW", value: 0 },
        { id: "isabensusan", value: 0 },
        { id: "bdougie", value: 0 },
        { id: "jpmcb", value: 0 },
        { id: "OgDev-01", value: 0 },
      ],
    },
    color: getGraphColorPalette(),
    onClick: () => {},
    repoName: "open-sauced/app",
    setRepoName: (repoName: string | null) => {},
    isLoading: false,
  },
};

export const Loading: Story = {
  args: { isLoading: true },
};
