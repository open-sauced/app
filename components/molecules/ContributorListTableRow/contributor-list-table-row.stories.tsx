import { StoryFn } from "@storybook/react";
import ContributorListTableRow from "components/molecules/ContributorListTableRow/contributor-list-table-row";

const storyConfig = {
  title: "Design System/Molecules/ContributorListTableRow",
  component: ContributorListTableRow,
};

export default storyConfig;

const ContributorListTableRowTemplate: StoryFn<typeof ContributorListTableRow> = (args) => (
  <ContributorListTableRow {...args} />
);

export const ContributorListTableRowStory = ContributorListTableRowTemplate.bind({});

ContributorListTableRowStory.args = {
  contributor: {
    author_login: "foxyblocks",
    username: "foxyblocks",
    updated_at: "2021-08-24T00:00:00.000Z",
    user_id: 1,
    devstats_updated_at: "2021-08-24T00:00:00.000Z",
  },
};
