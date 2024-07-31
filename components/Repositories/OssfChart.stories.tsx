import { Meta, StoryObj } from "@storybook/react";
import OssfChart from "./OssfChart";

type Story = StoryObj<typeof OssfChart>;

const meta: Meta<typeof OssfChart> = {
  title: "Components/Repositories/OssfChart",
  component: OssfChart,
  args: {
    totalScore: 7.8,
    dependencyUpdateScore: 0.0,
    fuzzingScore: 0.0,
    maintainedScore: 8.2,
    isLoading: false,
    isError: false,
  },
};

export default meta;

export const Default: Story = {
  args: {
    totalScore: 7.8,
    dependencyUpdateScore: 0.0,
    fuzzingScore: 0.0,
    maintainedScore: 8.2,
    isLoading: false,
    isError: false,
  },
};

export const LoadingState: Story = {
  args: {
    totalScore: 7.8,
    dependencyUpdateScore: 0.0,
    fuzzingScore: 0.0,
    maintainedScore: 8.2,
    isLoading: true,
    isError: false,
  },
};

export const ErrorState: Story = {
  args: {
    totalScore: null,
    isLoading: false,
    isError: true,
  },
};
