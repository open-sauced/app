import React from "react";
import { ComponentStory } from "@storybook/react";
import { HiTrendingUp } from "react-icons/hi";
import Pill from "components/atoms/Pill/pill";

const storyConfig = {
  title: "Design System/Atoms/Pill",
  component: "Pill",
  argTypes: {
    color: {
      options: ["slate", "green", "yellow", "red"],
      control: { type: "select" },
    },
    size: {
      options: ["base", "small"],
      control: { type: "select" },
    },
  },
};

export default storyConfig;

const BasePills: ComponentStory<typeof Pill> = (args) => (
  <div>
    <Pill text="+150%" color="slate" size="base" />
    <Pill text="+150%" color="green" size="base" />
    <Pill text="+150%" color="yellow" size="base" />
    <Pill text="+150%" color="red" size="base" />
  </div>
);

export const Base = BasePills.bind({});

const SmallPills: ComponentStory<typeof Pill> = (args) => (
  <div className="flex gap-2">
    <Pill text="+150%" color="slate" size="small" />
    <Pill text="+150%" color="green" size="small" />
    <Pill text="+150%" color="yellow" size="small" />
    <Pill text="+150%" color="red" size="small" />
  </div>
);

export const Small = SmallPills.bind({});

const IconPills: ComponentStory<typeof Pill> = (args) => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-2">
      <Pill text="+150%" color="slate" size="base" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="green" size="base" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="yellow" size="base" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="red" size="base" icon={<HiTrendingUp />} />
    </div>
    <div className="flex gap-2">
      <Pill text="+150%" color="slate" size="small" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="green" size="small" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="yellow" size="small" icon={<HiTrendingUp />} />
      <Pill text="+150%" color="red" size="small" icon={<HiTrendingUp />} />
    </div>
  </div>
);

export const HasIcon = IconPills.bind({});
