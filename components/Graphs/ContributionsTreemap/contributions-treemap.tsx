import { useSpring, animated } from "@react-spring/web";
import dynamic from "next/dynamic";
import { Datum } from "@nivo/line";
import { ReactNode } from "react";
import Card from "components/atoms/Card/card";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Button from "components/shared/Button/button";
import { OnToggleResizeEventType, Resizer } from "components/Graphs/shared/graph-resizer";
import type { NodeMouseEventHandler, NodeProps, TreeMapCommonProps } from "@nivo/treemap";
import { SpecialNode } from "./special-node";
import { ContributorNode } from "./contributor-node";

interface ContributionsTreemapProps {
  data: any;
  color: TreeMapCommonProps<Datum>["colors"];
  projectId: string | null;
  orgName: string | null;
  isLoading: boolean;
  onDrillDown: NodeMouseEventHandler<object>;
  onDrillUp: () => void;
  onToggleResize: OnToggleResizeEventType;
}

function BreadCrumb({
  isActive,
  useSeparator = true,
  children,
}: {
  isActive: boolean;
  useSeparator?: boolean;
  children: ReactNode;
}) {
  const separatorStyle = useSpring(isActive ? { opacity: 1 } : { opacity: 0 });
  const textStyle = useSpring(isActive ? { opacity: 1, translateX: 0 } : { opacity: 0, translateX: 100 });

  return (
    <>
      <animated.div style={textStyle} {...{ children }} />
      {useSeparator ? (
        <animated.div className={"px-1"} style={separatorStyle}>
          {"/"}
        </animated.div>
      ) : null}
    </>
  );
}

const ResponsiveTreeMapHtml = dynamic(() => import("@nivo/treemap").then((module) => module.ResponsiveTreeMapHtml), {
  ssr: false,
});

export const ContributionsTreemap = ({
  projectId,
  orgName,
  data,
  color,
  isLoading,
  onDrillDown: onDrilldown,
  onDrillUp,
  onToggleResize,
}: ContributionsTreemapProps) => {
  return (
    <Card className="grid place-content-stretch">
      <>
        <Resizer onToggleResize={onToggleResize} />
        <div className="grid">
          {/* Label: Text */}
          <h2 className="font-medium text-lg text-slate-900 mb-2 flex items-center justify-between">
            All Contributions
          </h2>
          <div className="text-sm text-slate-400 mb-4">Based on the number of PRs</div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 mb-2">
              {orgName ? (
                <BreadCrumb isActive={true} useSeparator={projectId !== null}>
                  {orgName}
                </BreadCrumb>
              ) : null}
              {projectId ? (
                <>
                  <BreadCrumb isActive={true}>{projectId}</BreadCrumb>
                  <BreadCrumb isActive={true} useSeparator={false}>
                    Contributors
                  </BreadCrumb>
                </>
              ) : null}
            </div>
            <div className="flex gap-2 mb-2">
              <Button variant="outline" disabled={!orgName} onClick={orgName ? onDrillUp : undefined}>
                <span className="sr-only">Drill up in the treemap of contributions</span>
                <span className="not-sr-only">Back</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md overflow-hidden grid place-content-stretch">
            <div className="grid" style={{ gridArea: "1 / 1", minHeight: "29rem" }}>
              <ClientOnly>
                {isLoading ? (
                  <SkeletonWrapper />
                ) : (
                  <ResponsiveTreeMapHtml
                    data={data}
                    tile="squarify"
                    labelSkipSize={12}
                    innerPadding={4}
                    leavesOnly
                    orientLabel={false}
                    nodeComponent={
                      projectId === null || orgName === null
                        ? SpecialNode
                        : // TODO: Sort this out later
                          (ContributorNode as <Datum extends object>({
                            node,
                            animatedProps,
                            borderWidth,
                            enableLabel,
                            labelSkipSize,
                          }: NodeProps<Datum>) => JSX.Element)
                    }
                    colors={color}
                    nodeOpacity={1}
                    borderWidth={0}
                    onClick={onDrilldown}
                    motionConfig={"default"}
                  />
                )}
              </ClientOnly>
            </div>
          </div>
        </div>
      </>
    </Card>
  );
};
