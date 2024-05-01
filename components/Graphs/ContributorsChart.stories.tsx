import { Meta, StoryObj } from "@storybook/react";
import ContributorsChart from "./ContributorsChart";

type Story = StoryObj<typeof ContributorsChart>;

const meta: Meta<typeof ContributorsChart> = {
  title: "Components/Graphs/ContributorsChart",
  component: ContributorsChart,
  args: {
    stats: generate30DaysData(),
    range: 30,
    rangedTotal: 228,
    syncId: 1234,
    isLoading: false,
  },
};

export default meta;

export const Days30: Story = {
  args: {
    stats: generate30DaysData(),
    range: 30,
    rangedTotal: 137,
    syncId: 1234,
  },
};

export const Days7: Story = {
  args: {
    stats: generate7DaysData(),
    range: 7,
    rangedTotal: 32,
    syncId: 1234,
  },
};

export const Days90: Story = {
  args: {
    stats: generate90DaysData(),
    range: 90,
    rangedTotal: 228,
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
      bucket: "2024-04-01T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-02T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-03T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-04T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-04-05T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-06T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-07T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-08T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-04-09T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-10T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-11T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-12T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-13T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-14T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-15T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-16T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-04-17T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-18T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-19T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-21T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-04-22T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-23T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-04-24T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-25T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-26T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-27T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-28T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-29T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-04-30T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-05-01T00:00:00.000Z",
      contributor_count: 2,
    },
  ];
}

function generate7DaysData() {
  return [
    {
      bucket: "2024-04-25T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-26T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-27T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-28T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-29T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-04-30T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-05-01T00:00:00.000Z",
      contributor_count: 2,
    },
  ];
}

function generate90DaysData() {
  return [
    {
      bucket: "2024-02-02T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-02-03T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-02-04T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-02-05T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-06T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-02-07T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-02-08T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-02-09T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-02-10T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-02-11T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-13T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-02-14T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-15T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-02-16T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-17T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-18T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-19T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-02-20T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-02-21T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-02-22T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-02-23T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-02-24T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-02-25T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-02-26T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-02-27T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-02-28T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-02-29T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-01T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-04T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-05T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-03-06T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-03-07T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-03-08T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-09T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-03-10T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-03-11T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-03-12T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-13T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-03-14T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-03-15T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-03-16T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-18T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-03-19T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-03-20T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-03-21T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-22T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-03-23T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-24T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-25T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-03-26T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-03-27T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-03-28T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-29T00:00:00.000Z",
      contributor_count: 9,
    },
    {
      bucket: "2024-03-30T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-03-31T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-01T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-02T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-03T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-04T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-04-05T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-06T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-07T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-08T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-04-09T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-10T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-11T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-12T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-13T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-14T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-15T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-16T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-04-17T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-18T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-19T00:00:00.000Z",
      contributor_count: 6,
    },
    {
      bucket: "2024-04-21T00:00:00.000Z",
      contributor_count: 2,
    },
    {
      bucket: "2024-04-22T00:00:00.000Z",
      contributor_count: 3,
    },
    {
      bucket: "2024-04-23T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-04-24T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-25T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-26T00:00:00.000Z",
      contributor_count: 7,
    },
    {
      bucket: "2024-04-27T00:00:00.000Z",
      contributor_count: 5,
    },
    {
      bucket: "2024-04-28T00:00:00.000Z",
      contributor_count: 1,
    },
    {
      bucket: "2024-04-29T00:00:00.000Z",
      contributor_count: 8,
    },
    {
      bucket: "2024-04-30T00:00:00.000Z",
      contributor_count: 4,
    },
    {
      bucket: "2024-05-01T00:00:00.000Z",
      contributor_count: 2,
    },
  ];
}
