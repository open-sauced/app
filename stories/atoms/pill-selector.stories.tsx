import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PillSelector from "../../components/atoms/PillSelector/pill-selector";
import Thumbnail from "../../public/hacktoberfest-icon.png";

const storyConfig = {
  title: "Design System/Atoms/PillSelector",
  component: "PillSelector"
};

const filterOptions = ["Top 1k Repos", "Minimum 5 Contributors", "1k Stars", "Most Active", "Most Spammed"];

export default storyConfig;

//PillSelector Template
const PillSelectorTemplate: ComponentStory<typeof PillSelector> = (args) => <PillSelector {...args} />;

export const Default = PillSelectorTemplate.bind({});

Default.args = { pillOptions: filterOptions };