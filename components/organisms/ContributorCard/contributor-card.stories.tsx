import type { Meta, StoryObj } from "@storybook/react";
import ContributorCard from "./contributor-card";

const baseContributor = Object.freeze({
  profile: {
    // an example github avatar for user bdougieyo
    githubAvatar: "https://avatars.githubusercontent.com/u/5713670?v=4",
    githubName: "bdougie",
    dateOfFirstPR: new Date("2020-01-01").toISOString(),
  },
});

const meta: Meta<typeof ContributorCard> = {
  component: ContributorCard,
};

export default meta;
type Story = StoryObj<typeof ContributorCard>;

// export const WithRepositories: Story = {
//   render: () => <ContributorCard prop="value" />,
// };

export const WithoutRepositories: Story = {
  render: () => <ContributorCard contributor={baseContributor} topic={""} />,
};
