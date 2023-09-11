import { Meta, StoryObj } from "@storybook/react";
import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";

const storyConfig = {
  title: "Design System/Organisms/Contributor Profile Page",
  component: ContributorProfilePage,
} satisfies Meta<typeof ContributorProfilePage>;
export default storyConfig;

type Story = StoryObj<typeof ContributorProfilePage>;

const listOfPRs = [
  {
    prName: "Merging some work",
    prStatus: "merged",
    prIssuedTime: "2mo",
    prMergedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
    repoName: "open-sauced",
    repoOwner: "open-sauced",
    prNumber: 1,
  },
  {
    prName: "Merging some work",
    prStatus: "closed",
    prIssuedTime: "2mo",
    prMergedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
    repoName: "open-sauced",
    repoOwner: "open-sauced",
    prNumber: 2,
  },
  {
    prName: "Merging some work",
    prStatus: "open",
    prIssuedTime: "2mo",
    prMergedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
    repoName: "open-sauced",
    repoOwner: "open-sauced",
    prNumber: 3,
  },
  {
    prName: "Merging some work",
    prStatus: "draft",
    prIssuedTime: "2mo",
    prMergedTime: "2mo",
    noOfFilesChanged: 13,
    noOfLinesChanged: 837,
    repoName: "open-sauced",
    repoOwner: "open-sauced",
    prNumber: 4,
  },
];

export const Default: Story = {
  args: {
    listOfPRs: listOfPRs,
  },
};
