import { ComponentStory } from "@storybook/react";
import ComponentDateFilter from "components/molecules/ComponentDateFilter/component-date-filter";

const storyConfig = {
  title: "Design System/Molecules/ComponentDateFilter"
};

export default storyConfig;

const componentDateFilterTemplate: ComponentStory<typeof ComponentDateFilter> = (args) => (
  <ComponentDateFilter {...args} />
);

export const DateFilterStory = componentDateFilterTemplate.bind({});

DateFilterStory.args = {
  defaultRange: 30,
  setRangeFilter: () => console.log("i was click")
};
