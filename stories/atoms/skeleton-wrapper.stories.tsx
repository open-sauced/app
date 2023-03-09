import React from "react";
import { ComponentStory } from "@storybook/react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

const storyConfig = {
  title: "Design System/Atoms/Skeleton Wrapper",
  component: "SkeletonWrapper"
};

export default storyConfig;

//Select Template
const SkeletonTemplate: ComponentStory<typeof SkeletonWrapper> = (args) => <SkeletonWrapper {...args} />;

export const Default = SkeletonTemplate.bind({});
export const doubleWrappers = SkeletonTemplate.bind({});
export const tripleWrappers = SkeletonTemplate.bind({});

Default.args = {
  count: 1,
  height: 180,
  width: 300,
  radius: 4
};

doubleWrappers.args = {
  count: 2,
  height: 90,
  width: 300,
  radius: 4
};

tripleWrappers.args = {
  count: 3,
  height: 60,
  width: 300,
  radius: 4
};
