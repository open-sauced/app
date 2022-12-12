import ContributorProfileHeader from "components/molecules/ContributorProfileHeader/contributor-profile-header";
import { ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Molecules/Contributor Profile Header"
};

export default storyConfig;

const ContributorProfileHeaderTemplate: ComponentStory<typeof ContributorProfileHeader> = (args) => (
  <ContributorProfileHeader {...args} />
);

export const ContributorProfileHeaderStory = ContributorProfileHeaderTemplate.bind({});
ContributorProfileHeaderStory.args = {
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
};
