import { Meta, StoryFn } from "@storybook/react";
import { TipProvider } from "components/atoms/Tooltip/tooltip";
import ListCard from "components/molecules/ListCard/list-card";

const storyConfig = {
  title: "Design System/Molecules/ListCard",
} as Meta<typeof ListCard>;

const testUser: DbListOwner = {
  id: 1,
  login: "user1",
  name: "User 1",
};

export default storyConfig;

const ListCardTemplate: StoryFn<typeof ListCard> = (args) => (
  <TipProvider>
    <ListCard {...args} />
  </TipProvider>
);

export const Default = ListCardTemplate.bind({});

Default.args = {
  list: {
    id: "1",
    name: "List 1",
    is_public: true,
    created_at: "2021-08-10T14:00:00.000Z",
    updated_at: "2021-08-10T14:00:00.000Z",
    user: testUser,
  },
};
