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
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837
  },
  {
    prName: "Merging some work",
    prStatus: "closed",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837
  },
  {
    prName: "Merging some work",
    prStatus: "open",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837
  },
  {
    prName: "Merging some work",
    prStatus: "draft",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837
  }
];

//CardTable Template
const ContributorTableTemplate: ComponentStory<typeof ContributorTable> = (args) => <ContributorTable {...args} />;

export const AddedPullRequests = ContributorTableTemplate.bind({});
export const NoPullRequests = ContributorTableTemplate.bind({});

AddedPullRequests.args = {
};

NoPullRequests.args = {
};