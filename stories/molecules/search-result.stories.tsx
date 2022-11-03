import SearchResults from "components/molecules/SearchResults/search-results";
import { ComponentStory } from "@storybook/react";

const StoryConfig = {
  title: "Design System/Molecules/SearchResults"
};
export default StoryConfig;

const SearchResultsTemplates: ComponentStory<typeof SearchResults> = (args) => <SearchResults {...args} />;

export const Default = SearchResultsTemplates.bind({});

Default.args = {
  children: <div>Hello</div>,
  state: "open"
};
