import RepositoriesCart from "components/organisms/RepositoriesCart/repositories-cart";
import { ComponentStory } from "@storybook/react";
import RepositoryCartItem from "components/molecules/ReposoitoryCartItem/repository-cart-item";

const storyConfig = {
  title: "Design System/Organisms/RepositoriesCart"
};

export default storyConfig;

const RepositoriesCartTemplate: ComponentStory<typeof RepositoriesCart> = (args) => (
  <RepositoriesCart {...args}>
    <RepositoryCartItem handleRemoveItem={() => {}} avatar="" totalIssues={120} orgName="open sauced" repoName="hot" />
    <RepositoryCartItem
      handleRemoveItem={() => {}}
      avatar=""
      totalIssues={120}
      orgName="open sauced"
      repoName="insights"
    />
    <RepositoryCartItem
      handleRemoveItem={() => {}}
      avatar=""
      totalIssues={120}
      orgName="open sauced"
      repoName="workflow"
    />
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
    { orgName: "open sauced", repoName: "insights", totalIssues: 87, handleRemoveItem: () => {} },
    { orgName: "facebook", repoName: "react", totalIssues: 233, handleRemoveItem: () => {} }
  ],
  hasItems: true
};
