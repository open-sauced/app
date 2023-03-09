import React from "react";
import { ComponentStory } from "@storybook/react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import "react-loading-skeleton/dist/skeleton.css";

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
  height: 60,
  width: 100,
  radius: 4
};

doubleWrappers.args = {
  count: 2,
  height: 30,
  width: 100,
  radius: 4
};

tripleWrappers.args = {
  count: 3,
  height: 20,
  width: 100,
  radius: 4
};
