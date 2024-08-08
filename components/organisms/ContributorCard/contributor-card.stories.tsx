import type { Meta, StoryObj } from "@storybook/react";
import ContributorCard from "./contributor-card";

const baseContributor = Object.freeze({
  author_login: "bdougie",
  username: "bdougie",
  updated_at: new Date("2020-01-01").toISOString(),
  user_id: 5713670,
  devstats_updated_at: "2021-08-24T00:00:00.000Z",
});

const meta: Meta<typeof ContributorCard> = {
  title: "Design System/Organisms/Contributor Card",
  component: ContributorCard,
};

export default meta;
type Story = StoryObj<typeof ContributorCard>;

// export const WithRepositories: Story = {
//   render: () => <ContributorCard prop="value" />,
// };

export const WithoutRepositories: Story = {
  render: () => <ContributorCard contributor={baseContributor} topic={""} showOscr={true} />,
};
