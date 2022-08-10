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
      options: ["participation", "accepted-pr", "unlabeled-pr", "spam"],
      control: { type: "select" }
    },
    url: {
      control: { type: "text" }
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
  icon: "participation",
  metricIncreases: true,
  increased: true,
  numChanged: 38,
  percentage: 42,
  percentageLabel: "of 49,999"
};

// HighlightCard: Metric Decreases
export const Decreases = HighlightCardTemplate.bind({});
Decreases.args = { 
  label: "Spam",
  icon: "spam",
  metricIncreases: false,
  increased: true,
  numChanged: 98,
  percentage: 80,
  percentageLabel: "of 49,999"
};