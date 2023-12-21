import { useSpring, animated } from "@react-spring/web";
import dynamic from "next/dynamic";
import { Datum } from "@nivo/line";
import { ReactNode } from "react";
import Card from "components/atoms/Card/card";
import { SpecialNode } from "components/molecules/TreemapPrototype/special-node";
import { ContributorNode } from "components/molecules/TreemapPrototype/contributor-node";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Button from "components/atoms/Button/button";
import type { NodeMouseEventHandler, NodeProps, TreeMapCommonProps } from "@nivo/treemap";

interface ContributionsTreemapProps {
  data: any;
  color: TreeMapCommonProps<Datum>["colors"];
  repoId: number | null;
  orgId: string | null;
  isLoading: boolean;
  onDrilldown: NodeMouseEventHandler<object>;
  onShowOrgs: () => void;
  onShowRepos: () => void;
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
  repoId,
  orgId,
  data,
  color,
  isLoading,
  onDrilldown,
  onShowOrgs,
  onShowRepos,
}: ContributionsTreemapProps) => {
  return (
    <Card className="grid place-content-stretch">
      <div className="grid">
        {/* Label: Text */}
        <h2 className="font-medium text-lg text-slate-900 mb-2 flex items-center justify-between">
          <div>All Contributions</div>
          <div aria-live="polite">
            <div className="flex gap-2 items-center">
              {orgId ? (
                <BreadCrumb isActive={true} useSeparator={repoId !== null}>
                  {orgId}
                </BreadCrumb>
              ) : null}
              {repoId ? (
                <>
                  <BreadCrumb isActive={true}>{repoId}</BreadCrumb>
                  <BreadCrumb isActive={true} useSeparator={false}>
                    Contributors
                  </BreadCrumb>
                </>
              ) : null}
            </div>
          </div>
        </h2>
        <div className="flex gap-2 mb-2">
          <Button variant="outline" onClick={onShowOrgs}>
            All Owners
          </Button>
          <Button disabled={repoId === null} variant="outline" onClick={onShowRepos}>
            {orgId} Repos
          </Button>
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
                    repoId === null || orgId === null
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
    </Card>
  );
};
