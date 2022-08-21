import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTable from "components/molecules/CardTable/card-table";

const storyConfig = {
  title: "Design System/Molecules/Card Table",
  component: "Card Table"
};

export default storyConfig;

//CardTable Template
const CardTableTemplate: ComponentStory<typeof CardTable> = (args) => <CardTable />;

export const Default = CardTableTemplate.bind({});

Default.args = {
  children: <>Test</>
};