import React from "react";
import { ComponentStory } from "@storybook/react";
import Selector from "components/atoms/Selector/selector";
import FilterCardSelect from "components/molecules/FilterCardSelect/filter-card-select";

const storyConfig = {
  title: "Design System/Molecules/FilterCardSelect",
  component: "FilterCardSelect"
};

export default storyConfig;

//Select Template
const SelectTemplate: ComponentStory<typeof FilterCardSelect> = (args) => <FilterCardSelect {...args} />;

export const Default = SelectTemplate.bind({});

Default.args = {
    options: ["option1", "option2", "option3"],
    selected: "option1",
};
