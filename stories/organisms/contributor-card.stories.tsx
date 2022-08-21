import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorCard from "components/organisms/ContributorCard/contributor-card";

const storyConfig = {
  title: "Design System/Organisms/Contributor Card",
  component: "ContributorCard"
};

export default storyConfig;

//ContributorCard Template
const ContributorCardTemplate: ComponentStory<typeof ContributorCard> = (args) => <ContributorCard />;

export const Default = ContributorCardTemplate.bind({});

Default.args = {};