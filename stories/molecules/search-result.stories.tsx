import { ComponentStory } from "@storybook/react";
import SearchResults from "components/molecules/SearchResults/search-results";
import RepositoryResult from "components/molecules/RepositoryResult/repository-result";
const StoryConfig = {
  title: "Design System/Molecules/SearchResults"
};
export default StoryConfig;

const SearchResultsTemplates: ComponentStory<typeof SearchResults> = (args) => (
  <SearchResults {...args}>
    <RepositoryResult />
    <RepositoryResult />
    <RepositoryResult />
  </SearchResults>
);

export const Default = SearchResultsTemplates.bind({});

Default.args = {
  state: "open"
};
