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
  githubAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  githubName: "ChadStewart",
  totalPRs: 4,
  dateOfFirstPR: "3mo"
};