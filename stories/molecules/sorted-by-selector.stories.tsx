import React from "react";
import SortedBySelector from "components/molecules/SortedBySelector/sorted-by-selector";
import { ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Molecules/SortedBySelector",
  component: "SortedBySelector"
};
export default storyConfig;

const sortingOptions = ["name", "spamPrsCount", "prVelocityCount", "prsCount"];

// SortedBySelector Template
const SortedBySelectorTemplate: ComponentStory<typeof SortedBySelector> = (args) => (
  <SortedBySelector {...args} />
);

export const Default = SortedBySelectorTemplate.bind({});
export const Selected = SortedBySelectorTemplate.bind({});

Default.args = {
  selected: ""
};
Selected.args = {
  selected: sortingOptions[0]
};
