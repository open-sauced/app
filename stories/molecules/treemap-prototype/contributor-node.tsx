import { memo } from "react";
import { animated } from "@react-spring/web";
import { NodeProps, htmlNodeTransform } from "@nivo/treemap";
import { getAvatarByUsername } from "lib/utils/github";

const NonMemoizedContributorNode = <Datum extends { id: string; value?: number; color: string }>({
  node,
  animatedProps,
  borderWidth,
  enableLabel,
  labelSkipSize,
}: NodeProps<Datum>) => {
  const showLabel =
    enableLabel && node.isLeaf && (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize);

  const avatarURL = getAvatarByUsername(node.id);

  return (
    <animated.div
      data-testid={`node.${node.id}`}
      id={node.path.replace(/[^\w]/gi, "-")}
      style={{
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        left: 0,
        transform: htmlNodeTransform(animatedProps.x, animatedProps.y),
        width: animatedProps.width,
        height: animatedProps.height,
        borderWidth,
        borderStyle: "solid",
        borderColor: node.borderColor,
        overflow: "hidden",
        display: "grid",
        placeContent: "stretch",
      }}
    >
      <animated.div
        style={{
          boxSizing: "border-box",
          opacity: node.opacity,
          width: animatedProps.width,
          height: animatedProps.height,
          background: animatedProps.color,
          gridArea: "1 / 1",
        }}
        onMouseEnter={node.onMouseEnter}
        onMouseMove={node.onMouseMove}
        onMouseLeave={node.onMouseLeave}
        onClick={node.onClick}
      />
      {showLabel && (
        <animated.div
          data-testid={`label.${node.id}`}
          className="grid p-3 text-white place-items-start pointer-events-none"
          style={{
            gridArea: "1 / 1",
            transformOrigin: "center center",
            opacity: animatedProps.labelOpacity,
            placeItems: "flex-start",
          }}
        >
          <div className="grid gap-x-2" style={{ gridTemplateColumns: "auto 1fr", gridTemplateRows: "auto auto" }}>
            <img
              className="col-start-1 col-span-1 row-span-2"
              src={avatarURL}
              width="42"
              height="42"
              style={{ display: "block", borderRadius: "50%", border: "solid 2px white", flexShrink: 0, flexGrow: 0 }}
            />
            <div className="font-medium" style={{ gridColumnStart: "2", alignItems: "center", alignSelf: "center" }}>
              {node.id}
            </div>
            <div
              className="font-normal"
              style={{ textOverflow: "ellipsis", gridColumnStart: "2", marginTop: "-0.5rem" }}
            >
              {node.formattedValue} Contributions
            </div>
          </div>
        </animated.div>
      )}
    </animated.div>
  );
};

export const ContributorNode = memo(NonMemoizedContributorNode) as typeof NonMemoizedContributorNode;
