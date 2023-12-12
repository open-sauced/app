import { ComponentStory } from "@storybook/react";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";

const storyConfig = {
  title: "Design System/Molecules/RepositoriesCartItem",
};
export default storyConfig;

const RepositoryCartItemTemplate: ComponentStory<typeof RepositoryCartItem> = (args) => (
  <RepositoryCartItem {...args} />
);

export const Default = RepositoryCartItemTemplate.bind({});

Default.args = {
  orgName: "open sauced",
  repoName: "hot",
  totalPrs: 32,
};
