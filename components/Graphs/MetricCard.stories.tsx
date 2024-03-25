import { Meta, StoryObj } from "@storybook/react";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";
import MetricCard from "./MetricCard";

type MetricCardAndRepositoryArgs = React.ComponentProps<typeof MetricCard> & { repository: string };
type Story = StoryObj<MetricCardAndRepositoryArgs>;

const meta: Meta<typeof MetricCard> = {
  title: "Components/Graphs/MetricCard",
  component: MetricCard,
};

export default meta;

export const StarsPerDay: Story = {
  args: {
    repository: "open-sauced/app",
  },
  render: ({ repository }) => <StarMetricCard repository={repository} />,
};

export const ForksPerDay: Story = {
  args: {
    repository: "open-sauced/app",
  },
  render: ({ repository }) => <ForkMetricCard repository={repository} />,
};

const StarMetricCard = ({ repository }: { repository: string }) => {
  const { data: starStats, error: starError } = useFetchMetricStats({
    repository,
    variant: "stars",
    range: 30,
  });

  return <MetricCard variant="stars" stats={starStats} />;
};

const ForkMetricCard = ({ repository }: { repository: string }) => {
  const { data: forkStats, error: forkError } = useFetchMetricStats({
    repository,
    variant: "forks",
    range: 30,
  });

  return <MetricCard variant="forks" stats={forkStats} />;
};
