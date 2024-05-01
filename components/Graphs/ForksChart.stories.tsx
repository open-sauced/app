import { Meta, StoryObj } from "@storybook/react";
import ForksChart from "./ForksChart";

type Story = StoryObj<typeof ForksChart>;

const meta: Meta<typeof ForksChart> = {
  title: "Components/Graphs/ForksChart",
  component: ForksChart,
  args: {
    stats: generate30DaysData(),
    range: 30,
    total: 228,
    syncId: 1234,
    isLoading: false,
  },
};

export default meta;

export const Days30: Story = {
  args: {
    stats: generate30DaysData(),
    range: 30,
    total: 228,
    syncId: 1234,
  },
};

export const Days7: Story = {
  args: {
    stats: generate7DaysData(),
    range: 7,
    total: 228,
    syncId: 1234,
  },
};

export const Days90: Story = {
  args: {
    stats: generate90DaysData(),
    range: 90,
    total: 228,
    syncId: 1234,
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};

function generate30DaysData() {
  return [
    {
      bucket: "2024-03-31T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-23T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-20T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-19T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-16T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-13T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-10T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-09T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-08T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-05T00:00:00.000Z",
      forks_count: 2,
    },
  ];
}

function generate7DaysData() {
  return [
    {
      bucket: "2024-03-31T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      forks_count: 1,
    },
  ];
}

function generate90DaysData() {
  return [
    {
      bucket: "2024-03-31T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-23T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-20T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-19T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-16T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-13T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-10T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-09T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-08T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-05T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-03T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-03-02T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-03-01T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-02-18T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-02-07T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-02-03T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-02-01T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-29T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-26T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-01-25T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-01-22T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-21T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-18T00:00:00.000Z",
      forks_count: 3,
    },
    {
      bucket: "2024-01-16T00:00:00.000Z",
      forks_count: 2,
    },
    {
      bucket: "2024-01-15T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-13T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-07T00:00:00.000Z",
      forks_count: 1,
    },
    {
      bucket: "2024-01-04T00:00:00.000Z",
      forks_count: 1,
    },
  ];
}
