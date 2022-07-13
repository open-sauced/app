import React from "react";
import { ComponentStory } from "@storybook/react";
import HighlightCard from "../../components/molecules/HighlightCard/highlight-card";

const storyConfig = {
  title: "Design System/Molecules/Highlight Card",
  component: "HighlightCard",
  argTypes: {
    label: {
      control: { type: "text" }
    },
    icon: {
      options: ["repo", "topic", "org", "contributor"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;

// HighlightCard Template
const HighlightCardTemplate: ComponentStory<typeof HighlightCard> = (args) => <HighlightCard {...args} />;

// HighlightCard: Metric Increases
export const Increases = HighlightCardTemplate.bind({});
Increases.args = { 
  label: "Participation",
  icon: "repo",
  metricIncreases: true,
  increased: true,
  numChanged: 38,
  percentage: 42,
  percentageLabel: "of 49,999"
};

// HighlightCard: Metric Decreases
export const Decreases = HighlightCardTemplate.bind({});
Decreases.args = { 
  label: "Participation",
  icon: "repo",
  metricIncreases: false,
  increased: true,
  numChanged: 38,
  percentage: 42,
  percentageLabel: "of 49,999"
};