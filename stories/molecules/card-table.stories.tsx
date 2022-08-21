import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTable from "components/molecules/CardTable/card-table";

const storyConfig = {
  title: "Design System/Molecules/Card Table",
  component: "Card Table"
};

export default storyConfig;

const testPRs = [
  {
    prName: "Merging some work",
    prStatus: "merged",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "closed",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "open",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  },
  {
    prName: "Merging some work",
    prStatus: "draft",
    item1: "2mo",
    item2: "2mo",
    item3: 13,
    item4: 837
  }
];

//CardTable Template
const CardTableTemplate: ComponentStory<typeof CardTable> = (args) => <CardTable {...args} />;

export const Default = CardTableTemplate.bind({});

Default.args = {
  prList: testPRs
};