import { useSpring, animated } from "@react-spring/web";
import dynamic from "next/dynamic";
import { Datum } from "@nivo/line";
import Card from "components/atoms/Card/card";
import { SpecialNode } from "components/molecules/TreemapPrototype/special-node";
import { ContributorNode } from "components/molecules/TreemapPrototype/contributor-node";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import type { NodeMouseEventHandler, NodeProps, TreeMapCommonProps } from "@nivo/treemap";

interface ContributionsTreemapProps {
  data: any;
  color: TreeMapCommonProps<Datum>["colors"];
  onClick: NodeMouseEventHandler<object>;
  repoId: number | null;
  setRepoId: (repoId: number | null) => void;
}

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

const ResponsiveTreeMapHtml = dynamic(() => import("@nivo/treemap").then((module) => module.ResponsiveTreeMapHtml), {
  ssr: false,
});

export const ContributionsTreemap = ({ setRepoId, repoId, data, color, onClick }: ContributionsTreemapProps) => {
  return (
    <Card className="grid place-content-stretch">
      <div className="grid">
        {/* Label: Text */}
        <h2 className="font-medium text-lg text-slate-900 mb-2 flex">
          <button
            className="cursor-pointer underline underline-offset-4 decoration-orange-500 hover:decoration-light-slate-8"
            onClick={() => setRepoId(null)}
          >
            Repos
          </button>
          <div> </div>
          <BreadCrumb isActive={repoId !== null}>Contributors</BreadCrumb>
        </h2>
        <div className="rounded-md overflow-hidden grid place-content-stretch">
          <div className="grid" style={{ gridArea: "1 / 1", minHeight: "29rem" }}>
            <ClientOnly>
              <ResponsiveTreeMapHtml
                data={data}
                tile="squarify"
                labelSkipSize={12}
                innerPadding={4}
                leavesOnly
                orientLabel={false}
                nodeComponent={
                  repoId === null
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
                onClick={onClick}
                motionConfig={"default"}
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </Card>
  );
};
