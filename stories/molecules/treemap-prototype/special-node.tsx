import { memo } from "react";
import { animated } from "@react-spring/web";
import { NodeProps, htmlNodeTransform } from "@nivo/treemap";

const NonMemoizedSpecialNode = <Datum extends object>({
  node,
  animatedProps,
  borderWidth,
  enableLabel,
  labelSkipSize,
}: NodeProps<Datum>) => {
  const showLabel =
    enableLabel && node.isLeaf && (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize);

  return (
    <animated.div
      className="absolute grid place-content-stretch overflow-hidden border-solid"
      style={{
        top: 0,
        left: 0,
        transform: htmlNodeTransform(animatedProps.x, animatedProps.y),
        width: animatedProps.width,
        height: animatedProps.height,
        borderWidth,
        borderColor: node.borderColor,
      }}
    >
      <animated.div
        style={{
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
          <div className="grid gap-2">
            <div className="font-medium text-sm">{node.id}</div>
            <div className="font-normal text-xs" style={{ textOverflow: "ellipsis" }}>
              {node.label}
            </div>
          </div>
        </animated.div>
      )}
    </animated.div>
  );
};

export const SpecialNode = memo(NonMemoizedSpecialNode) as typeof NonMemoizedSpecialNode;
