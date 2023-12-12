import React from "react";
import { ComponentStory } from "@storybook/react";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";

const storyConfig = {
  title: "Design System/Molecules/Contributor Table",
  component: "Card Table",
};

export default storyConfig;

const testPRs = [
  {
    prName: "Merging some work",
    prStatus: "merged",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
  },
  {
    prName: "Merging some work",
    prStatus: "closed",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
  },
  {
    prName: "Merging some work",
    prStatus: "open",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
  },
  {
    prName: "Merging some work",
    prStatus: "draft",
    prIssuedTime: "2mo",
    prClosedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
  },
];

//CardTable Template
const PullRequestTableTemplate: ComponentStory<typeof PullRequestTable> = (args) => <PullRequestTable {...args} />;

export const AddedPullRequests = PullRequestTableTemplate.bind({});
export const NoPullRequests = PullRequestTableTemplate.bind({});

AddedPullRequests.args = {};

NoPullRequests.args = {};
