import { ComponentStory } from "@storybook/react";
import InsightsPageListDropdown from "components/molecules/InsightsPageListDropdown/insights-page-list-dropdown";

const storyConfig = {
  title: "Design System/Molecules/InsightsPageListDropdown"
};
export default storyConfig;

const InsightsPageListDropdownTemplate: ComponentStory<typeof InsightsPageListDropdown> = (args) => (
  <InsightsPageListDropdown />
);

export const DefaultStory = InsightsPageListDropdownTemplate.bind({});
