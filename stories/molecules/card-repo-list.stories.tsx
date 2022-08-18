import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";

const storyConfig = {
  title: "Design System/Molecules/Card Repo List",
  component: "Card Repo List"
};

export default storyConfig;

//CardRepoList Template
const CardRepoListTemplate: ComponentStory<typeof CardRepoList> = (args) => <CardRepoList />;

export const Default = CardRepoListTemplate.bind({});

Default.args = {
  children: <>Test</>
};