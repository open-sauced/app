import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";
import { ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Molecules/RepositoriesCartItem"
};
export default storyConfig;

const RepositoryCartItemTemplate: ComponentStory<typeof RepositoryCartItem> = (args) => (
  <RepositoryCartItem {...args} />
);

export const Default = RepositoryCartItemTemplate.bind({});

Default.args = {
  orgName: "open sauced",
  repoName: "hot",
  totalIssues: 32
};
