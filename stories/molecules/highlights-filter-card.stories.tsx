import { useState } from "react";
import HighlightsFilterCard from "@components/molecules/HighlightsFeedCard/highlights-filter-card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HighlightsFilterCard> = {
  title: "Design System/Molecules/HighlightsFilterCard",
  component: HighlightsFilterCard,
};
export default meta;

type Story = StoryObj<typeof HighlightsFilterCard>;

const HighlightsFilterCardWithHooks = () => {
  const [selectedFilter, setSelectedFilter] = useState("open-sauced/app");

  function setSelected() {
    setSelectedFilter((prev) => (prev ? "" : "open-sauced/app"));
  }

  return (
    <HighlightsFilterCard
      repos={[
        {
          repoIcon: "https://www.github.com/open-sauced.png?size=300",
          repoName: "app",
          full_name: "open-sauced/app",
        },
      ]}
      selectedFilter={selectedFilter}
      setSelected={setSelected}
    />
  );
};

export const Default: Story = {
  render: () => <HighlightsFilterCardWithHooks />,
};
