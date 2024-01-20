import { Meta, StoryObj } from "@storybook/react";
import { TrackedReposTable } from "./TrackedReposTable";

type Story = StoryObj<typeof TrackedReposTable>;

const meta: Meta<typeof TrackedReposTable> = {
  title: "Components/Workspaces/TrackedReposTable",
  component: TrackedReposTable,
  args: {
    repositories: [],
    onAddRepos: () => {
      // eslint-disable-next-line no-console
      console.log("add repos");
    },
    onRemoveTrackedRepo: () => {
      // eslint-disable-next-line no-console
      console.log("add repos");
    },
  },
};

export default meta;

export const WithRepos: Story = {
  args: {
    repositories: new Array(100).fill("").map((_, i) => `open-sauced/awesome-pizza-project-${i}`),
  },
};

export const EmpytState: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
