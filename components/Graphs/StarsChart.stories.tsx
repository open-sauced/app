import { Meta, StoryObj } from "@storybook/react";
import StarsChart from "./StarsChart";

type Story = StoryObj<typeof StarsChart>;

const meta: Meta<typeof StarsChart> = {
  title: "Components/Graphs/StarsChart",
  component: StarsChart,
  args: {
    stats: generate30DaysData(),
    range: 30,
    total: 3376,
    syncId: 1234,
    isLoading: false,
  },
};

export default meta;

export const Days30: Story = {
  args: {
    stats: generate30DaysData(),
    range: 30,
    total: 3376,
    syncId: 1234,
  },
};

export const Days7: Story = {
  args: {
    stats: generate7DaysData(),
    range: 7,
    total: 3376,
    syncId: 1234,
  },
};

export const Days90: Story = {
  args: {
    stats: generate90DaysData(),
    range: 90,
    total: 3376,
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
      bucket: "2024-03-06T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-07T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-08T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-09T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-10T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-03-11T00:00:00.000Z",
      star_count: 10,
    },
    {
      bucket: "2024-03-12T00:00:00.000Z",
      star_count: 11,
    },
    {
      bucket: "2024-03-13T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-14T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-03-15T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-16T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-17T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-03-18T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-19T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-20T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-21T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-22T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-24T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-25T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-26T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-27T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-28T00:00:00.000Z",
      star_count: 8,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-30T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-31T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-01T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-02T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-03T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-04T00:00:00.000Z",
      star_count: 8,
    },
  ];
}

function generate7DaysData() {
  return [
    {
      bucket: "2024-03-30T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-31T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-01T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-02T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-03T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-04T00:00:00.000Z",
      star_count: 8,
    },
  ];
}

function generate90DaysData() {
  return [
    {
      bucket: "2024-01-06T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-07T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-08T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-01-13T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-01-14T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-01-15T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-01-16T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-01-17T00:00:00.000Z",
      star_count: 21,
    },
    {
      bucket: "2024-01-18T00:00:00.000Z",
      star_count: 13,
    },
    {
      bucket: "2024-01-19T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-01-20T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-01-21T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-01-22T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-01-23T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-24T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-25T00:00:00.000Z",
      star_count: 13,
    },
    {
      bucket: "2024-01-26T00:00:00.000Z",
      star_count: 10,
    },
    {
      bucket: "2024-01-27T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-28T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-01-29T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-01-30T00:00:00.000Z",
      star_count: 10,
    },
    {
      bucket: "2024-01-31T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-02-01T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-02-02T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-02-03T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-02-04T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-02-05T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-02-06T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-02-07T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-02-08T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-02-09T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-02-10T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-02-11T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-02-12T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-02-13T00:00:00.000Z",
      star_count: 13,
    },
    {
      bucket: "2024-02-14T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-02-15T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-02-16T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-02-18T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-02-19T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-02-20T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-02-21T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-02-22T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-02-23T00:00:00.000Z",
      star_count: 9,
    },
    {
      bucket: "2024-02-24T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-02-25T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-02-26T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-02-27T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-02-28T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-02-29T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-03-01T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-02T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-03T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-04T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-05T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-06T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-07T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-08T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-09T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-10T00:00:00.000Z",
      star_count: 5,
    },
    {
      bucket: "2024-03-11T00:00:00.000Z",
      star_count: 10,
    },
    {
      bucket: "2024-03-12T00:00:00.000Z",
      star_count: 11,
    },
    {
      bucket: "2024-03-13T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-14T00:00:00.000Z",
      star_count: 6,
    },
    {
      bucket: "2024-03-15T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-16T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-17T00:00:00.000Z",
      star_count: 7,
    },
    {
      bucket: "2024-03-18T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-19T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-20T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-21T00:00:00.000Z",
      star_count: 4,
    },
    {
      bucket: "2024-03-22T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-24T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-25T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-26T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-03-27T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-28T00:00:00.000Z",
      star_count: 8,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      star_count: 1,
    },
    {
      bucket: "2024-03-30T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-03-31T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-01T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-02T00:00:00.000Z",
      star_count: 2,
    },
    {
      bucket: "2024-04-03T00:00:00.000Z",
      star_count: 3,
    },
    {
      bucket: "2024-04-04T00:00:00.000Z",
      star_count: 8,
    },
  ];
}
