import { ComponentStory } from "@storybook/react";
import SuperativeSelector from "components/molecules/SuperlativeSelector/superlative-selector";

const storyConfig = {
  title: "Design System/Molecules/SuperativeSelector",
  component: "SuperativeSelector"
};
export default storyConfig;

const testOptions = ["testOption1", "testOption2", "testOption3", "testOption4", "testOption5"];

// SuperativeSelector Template
const SuperlativeSelectorTemplate: ComponentStory<typeof SuperativeSelector> = (args) => (
  <SuperativeSelector {...args} />
);

export const Default = SuperlativeSelectorTemplate.bind({});
export const Selected = SuperlativeSelectorTemplate.bind({});
Default.args = {
  filterOptions: testOptions
};
Selected.args = {
  filterOptions: testOptions,
  selected: "testOption2"
};
