import { ResponsiveTreeMap } from "@nivo/treemap";
import { ContributorNode } from "stories/molecules/treemap-prototype/contributor-node";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Molecules/Treemap Example",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="grid w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Contributors: Story = {
  render: () => {
    const contributors = [
      {
        id: "foxyblocks",
        value: 68,
        color: "hsla(21, 90%, 48%, 1)",
      },
      {
        id: "codebytere",
        value: 166,
        color: "hsla(21, 90%, 48%, 1)",
      },
      {
        id: "miniak",
        value: 163,
        color: "hsla(21, 90%, 48%, 1)",
      },
      {
        id: "ckerr",
        value: 115,
        color: "hsla(21, 90%, 48%, 1)",
      },
      {
        id: "JeanMeche",
        value: 84,
        color: "hsla(21, 90%, 48%, 1)",
      },
      {
        id: "annacmc",
        value: 90,
        color: "hsla(21, 90%, 48%, 1)",
      },
    ];
    const data = { id: "root", color: "hsla(25, 95%, 53%, 1)", children: contributors };
    console.log(contributors);
    return (
      <ResponsiveTreeMap
        data={data}
        tile="squarify"
        labelSkipSize={12}
        innerPadding={4}
        leavesOnly
        orientLabel={false}
        nodeComponent={ContributorNode}
        colorBy={(node) => node.data.color}
        nodeOpacity={1}
      />
    );
  },
};
