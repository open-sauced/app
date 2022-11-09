import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import { ComponentStory } from "@storybook/react";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";

const storyConfig = {
  title: "Design System/Organisms/RepositoriesCart"
};

export default storyConfig;

const RepositoriesCartTemplate: ComponentStory<typeof RepositoriesCart> = (args) => (
  <RepositoriesCart {...args}>
    <RepositoryCartItem avatar="" totalPrs={120} orgName="open sauced" repoName="hot" />
    <RepositoryCartItem avatar="" totalPrs={120} orgName="open sauced" repoName="insights" />
    <RepositoryCartItem avatar="" totalPrs={120} orgName="open sauced" repoName="workflow" />
  </RepositoriesCart>
);

export const EmptyState = RepositoriesCartTemplate.bind({});

export const FilledState = RepositoriesCartTemplate.bind({});
export const WithHistory = RepositoriesCartTemplate.bind({});

FilledState.args = {
  hasItems: true
};
WithHistory.args = {
  history: [
    { orgName: "open sauced", repoName: "insights", totalPrs: 87 },
    { orgName: "facebook", repoName: "react", totalPrs: 233 }
  ],
  hasItems: true
};
