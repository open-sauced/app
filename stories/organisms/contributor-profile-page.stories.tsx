import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { ComponentStory } from "@storybook/react";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const storyConfig = {
  title: "Design System/Organisms/Contributor Profile Page"
};
export default storyConfig;
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
    prNumber: 1
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
    prNumber: 2
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
    prNumber: 3
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
    prNumber: 4
  }
];

const ContributorProfilePageTemplate: ComponentStory<typeof ContributorProfilePage> = (args) => (
  <TooltipProvider>
    <ContributorProfilePage {...args} />
  </TooltipProvider>
);

export const Default = ContributorProfilePageTemplate.bind({});

Default.args = {
  listOfPRs: listOfPRs
};
