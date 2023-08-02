import SuggestedRepositoriesList from "components/organisms/SuggestedRepoList/suggested-repo-list";

const storyConfig = {
  title: "Design System/Organisms/SuggestedRepositoriesList",
};
export default storyConfig;
const data = { avatar: "", prCount: 23, repoName: "hot", issueCount: 113, orgName: "open-sauced" };
export const SuggestedRepositoriesListStory = () => <SuggestedRepositoriesList reposData={[data, data, data]} />;
