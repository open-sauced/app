import { ComponentStory } from "@storybook/react";
import FilterCard from "../../components/atoms/FilterCard/filter-card";


const storyConfig = {
  title: "Design System/Atoms/FilterCard",
  component: "FilterCard",
  argTypes: {
    isRemovable: {
      options: [true, false],
      control: { type: "radio" }
    },
    icon: {
      options: ["repo", "topic", "org", "contributor"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;


// FilterCard Template
const FilterCardTemplate: ComponentStory<typeof FilterCard> = (args) => <FilterCard {...args} />;

// FilterCard Default
export const Default = FilterCardTemplate.bind({});
Default.args = { filterName: "hacktoberfest", isRemovable: false };

// FilterCard Removable
export const Removable = FilterCardTemplate.bind({});
Removable.args = { filterName: "hacktoberfest", isRemovable: true };