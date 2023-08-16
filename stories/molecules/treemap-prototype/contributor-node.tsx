import { memo } from "react";
import { animated, to } from "@react-spring/web";
import { NodeProps, svgLabelTransform, svgNodeTransform } from "@nivo/treemap";
import { getAvatarByUsername } from "lib/utils/github";

const NonMemoizedContributorNode = <Datum extends object>({
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
    <animated.g transform={svgNodeTransform(animatedProps.x, animatedProps.y)}>
      <defs>
        <clipPath id="circleView">
          <circle cx="50" cy="50" r="50" fill="#FFFFFF" />
        </clipPath>
      </defs>
      <animated.rect
        data-testid={`node.${node.id}`}
        width={to(animatedProps.width, (v) => Math.max(v, 0))}
        height={to(animatedProps.height, (v) => Math.max(v, 0))}
        fill={node.fill ? node.fill : animatedProps.color}
        strokeWidth={borderWidth}
        stroke={node.borderColor}
        fillOpacity={node.opacity}
        onMouseEnter={node.onMouseEnter}
        onMouseMove={node.onMouseMove}
        onMouseLeave={node.onMouseLeave}
        onClick={node.onClick}
      />
      <circle cx="50" cy="50" r="54" fill="#FFFFFF" />
      <image
        width="100"
        height="100"
        xlinkHref={avatarURL}
        clip-path="url(#circleView)"
        stroke="white"
        strokeWidth={2}
      />
      {showLabel && (
        <animated.text
          data-testid={`label.${node.id}`}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: node.labelTextColor,
            pointerEvents: "none",
          }}
          fillOpacity={animatedProps.labelOpacity}
          transform={svgLabelTransform(animatedProps.labelX, animatedProps.labelY, animatedProps.labelRotation)}
        >
          {node.label}
        </animated.text>
      )}
    </animated.g>
  );
};

export const ContributorNode = memo(NonMemoizedContributorNode) as typeof NonMemoizedContributorNode;
