import { ResponsiveTreeMapHtml, NodeMouseEventHandler } from "@nivo/treemap";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { ContributorNode } from "components/molecules/TreemapPrototype/contributor-node";
import Card from "components/atoms/Card/card";
import { SpecialNode } from "components/molecules/TreemapPrototype/special-node";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Prototypes/Treemap",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="grid p-4 bg-slate-50 w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

const color = "hsla(21, 90%, 48%, 1)";
const repos = [
  {
    id: "/insights",
    value: 340,
  },
  {
    id: "/hot",
    value: 120,
  },
  {
    id: "/ai",
    value: 120,
  },
  {
    id: "/pizza-cli",
    value: 100,
  },
  {
    id: "/super-secret-special-sauce",
    value: 84,
  },
];
const contributors = [
  {
    id: "foxyblocks",
    value: 68,
    color: color,
  },
  {
    id: "codebytere",
    value: 166,
    color: color,
  },
  {
    id: "miniak",
    value: 163,
    color: color,
  },
  {
    id: "ckerr",
    value: 115,
    color: color,
  },
  {
    id: "JeanMeche",
    value: 84,
    color: color,
  },
  {
    id: "annacmc",
    value: 90,
    color: color,
  },
];

export const Repos: Story = {
  render: () => {
    const data = {
      id: "root",
      color: color,
      children: repos,
    };
    return (
      <Card className="grid place-content-stretch">
        <div className="grid">
          {/* Label: Text */}
          <div className="text-lg text-slate-900 mb-2">Organizations / Repos</div>
          <div className="rounded-md overflow-hidden">
            <ResponsiveTreeMapHtml
              data={data}
              tile="squarify"
              labelSkipSize={12}
              innerPadding={4}
              leavesOnly
              orientLabel={false}
              nodeOpacity={1}
              borderWidth={0}
              colors={color}
              nodeComponent={SpecialNode}
              label={(node) => `${node.formattedValue} Contributors`}
            />
          </div>
        </div>
      </Card>
    );
  },
};
export const Contributors: Story = {
  render: () => {
    const color = "hsla(21, 90%, 48%, 1)";
    const data = {
      id: "root",
      color: color,
      children: contributors,
    };
    return (
      <Card className="grid place-content-stretch">
        <div className="grid">
          {/* Label: Text */}
          <div className="text-lg text-slate-900 mb-2">Organizations / Repos / Contributors</div>
          <div className="rounded-md overflow-hidden">
            <ResponsiveTreeMapHtml
              data={data}
              tile="squarify"
              labelSkipSize={12}
              innerPadding={4}
              leavesOnly
              orientLabel={false}
              nodeComponent={ContributorNode}
              colors={color}
              nodeOpacity={1}
              borderWidth={0}
            />
          </div>
        </div>
      </Card>
    );
  },
};

function BreadCrumb({ isActive, ...rest }: any) {
  const separatorStyle = useSpring(isActive ? { opacity: 1 } : { opacity: 0 });
  const textStyle = useSpring(isActive ? { opacity: 1, translateX: 0 } : { opacity: 0, translateX: 100 });
  return (
    <>
      <animated.div className={"px-1"} style={separatorStyle}>
        {"/"}
      </animated.div>
      <animated.div style={textStyle} {...rest} />
    </>
  );
}

function TreeTransitionExample() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const data = {
    id: "root",
    color: color,
    children: repos,
  };
  const data2 = {
    id: "root",
    color: color,
    children: contributors,
  };

  const handleClick: NodeMouseEventHandler<object> = (node, event) => {
    setCurrentLevel((prev) => prev + 1);
  };

  return (
    <Card className="grid place-content-stretch">
      <div className="grid">
        {/* Label: Text */}
        <div className="text-lg text-slate-900 mb-2 flex">
          <div className="cursor-pointer" onClick={() => setCurrentLevel(0)}>
            Repos
          </div>
          <div> </div>
          <BreadCrumb isActive={currentLevel > 0}>Contributors</BreadCrumb>
        </div>
        <div className="rounded-md overflow-hidden grid place-content-stretch">
          <div className="grid" style={{ gridArea: "1 / 1" }}>
            <ResponsiveTreeMapHtml
              data={currentLevel === 0 ? data : data2}
              tile="squarify"
              labelSkipSize={12}
              innerPadding={4}
              leavesOnly
              orientLabel={false}
              nodeComponent={currentLevel === 0 ? SpecialNode : ContributorNode}
              colors={color}
              nodeOpacity={1}
              borderWidth={0}
              onClick={handleClick}
              motionConfig={"default"}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export const TransitionBetweenLevels: Story = {
  render: () => {
    return <TreeTransitionExample />;
  },
};
