import { ComponentStory } from "@storybook/react";
import InsightsPageListItem from "components/atoms/InsightsPageListItem/insights-page-list-item";

const storyConfig = {
  title: "Design System/Atoms/InsightsPageListItem",
};
export default storyConfig;

const InsightsPageListItemTemplate: ComponentStory<typeof InsightsPageListItem> = (args) => (
  <InsightsPageListItem {...args} />
);

export const DefaultStory = InsightsPageListItemTemplate.bind({});

DefaultStory.args = {
  pageId: "kwjofijewew",
  pageName: "Insights team",
};
