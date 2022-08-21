import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorTable from "components/molecules/ContributorTable/contributor-table";

const storyConfig = {
  title: "Design System/Molecules/Contributor Table",
  component: "Card Table"
};

export default storyConfig;

const testPRs = [
  {
    prName: "Merging some work",
    prStatus: "merged",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "closed",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "open",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "draft",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  }
];

//CardTable Template
const ContributorTableTemplate: ComponentStory<typeof ContributorTable> = (args) => <ContributorTable {...args} />;

export const AddedPullRequests = ContributorTableTemplate.bind({});
export const NoPullRequests = ContributorTableTemplate.bind({});

AddedPullRequests.args = {
  prList: testPRs
};

NoPullRequests.args = {
  prList: []
};