import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardProfile from "components/molecules/CardProfile/card-profile";

const storyConfig = {
  title: "Design System/Molecules/Card Profile",
  component: "Card"
};

export default storyConfig;

//CardProfile Template
const CardProfileTemplate: ComponentStory<typeof CardProfile> = (args) => <CardProfile {...args} />;

export const Default = CardProfileTemplate.bind({});

Default.args = {
  githubName: "ChadStewart",
  totalPRs: 4,
  dateOfFirstPR: "3mo"
};