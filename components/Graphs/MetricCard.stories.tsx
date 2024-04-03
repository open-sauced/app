import { Meta, StoryObj } from "@storybook/react";
import MetricCard from "./MetricCard";

type MetricCardAndRepositoryArgs = React.ComponentProps<typeof MetricCard> & { repository: string };
type Story = StoryObj<MetricCardAndRepositoryArgs>;

const meta: Meta<typeof MetricCard> = {
  title: "Components/Graphs/MetricCard",
  component: MetricCard,
  args: {
    range: 30,
  },
};

export default meta;

export const StarMetricCard: Story = {
  args: {
    variant: "stars",
    stats: [
      { bucket: "2024-03-31T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-30T00:00:00.000Z", star_count: 2 },
      { bucket: "2024-03-29T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-23T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-19T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-17T00:00:00.000Z", star_count: 2 },
      { bucket: "2024-03-14T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-13T00:00:00.000Z", star_count: 3 },
      { bucket: "2024-03-12T00:00:00.000Z", star_count: 3 },
      { bucket: "2024-03-11T00:00:00.000Z", star_count: 1 },
      { bucket: "2024-03-06T00:00:00.000Z", star_count: 1 },
    ],
  },
};

export const ForkMetricCard = {
  args: {
    variant: "forks",
    stats: [
      { bucket: "2024-03-28T00:00:00.000Z", forks_count: 1 },
      { bucket: "2024-03-23T00:00:00.000Z", forks_count: 2 },
      { bucket: "2024-03-22T00:00:00.000Z", forks_count: 1 },
      { bucket: "2024-03-14T00:00:00.000Z", forks_count: 1 },
      { bucket: "2024-03-13T00:00:00.000Z", forks_count: 1 },
      { bucket: "2024-03-11T00:00:00.000Z", forks_count: 1 },
      { bucket: "2024-03-07T00:00:00.000Z", forks_count: 1 },
    ],
  },
};
