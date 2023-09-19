import { Meta, StoryObj } from "@storybook/react";
import MultiSelect, { OptionKeys } from "components/atoms/Select/multi-select";

export default {
  title: "Design System/Atoms/MultiSelect",
  component: MultiSelect,
} as Meta<typeof MultiSelect>;

type Story = StoryObj<typeof MultiSelect>;

let selectedOptions: OptionKeys[] = [{ label: "React", value: "react" }];

export const Default: Story = {
  args: {
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
      { label: "Angular", value: "angular" },
      { label: "Ember", value: "ember" },
      { label: "Meteor", value: "meteor" },
      { label: "Riot", value: "riot" },
      { label: "Solid", value: "solid" },
      { label: "Alpine", value: "alpine" },
      { label: "Marko", value: "marko" },
      { label: "Preact", value: "preact" },
      { label: "Inferno", value: "inferno" },
      { label: "Mithril", value: "mithril" },
      { label: "Nerv", value: "nerv" },
      { label: "AngularJS", value: "angularjs" },
      { label: "Backbone", value: "backbone" },
      { label: "Knockout", value: "knockout" },
      { label: "Polymer", value: "polymer" },
      { label: "Aurelia", value: "aurelia" },
      { label: "Ember", value: "ember" },
      { label: "Backbone", value: "backbone" },
      { label: "Knockout", value: "knockout" },
      { label: "Polymer", value: "polymer" },
      { label: "Aurelia", value: "aurelia" },
    ],
    selected: selectedOptions,
    handleSelect: (value) => {
      const exists = selectedOptions.find((option) => option.value === value);

      if (exists) {
        selectedOptions = selectedOptions.filter((option) => option.value !== exists.value);
      }
    },
    handleUnSelect: (value) => {
      selectedOptions = selectedOptions.filter((option) => option.value !== value);
    },
  },
};
