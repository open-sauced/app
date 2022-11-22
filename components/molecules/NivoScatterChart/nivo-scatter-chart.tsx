import { MouseEvent, useCallback } from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { animated } from "@react-spring/web";

import humanizeNumber from "lib/utils/humanizeNumber";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

interface ScatterPlotprops {
  maxFilesModified: number;
  data: {
    id: string;
    data: { x: string | number; y: string | number; image: string; contributor: string }[];
  }[];
}
const NivoScatterPlot = ({ data, maxFilesModified }: ScatterPlotprops) => {
  const isMobile = useMediaQuery("(max-width:720px)");

  return (
    <div className="h-[400px]">
      <ResponsiveScatterPlot
        tooltip={({ node }) => (
          <div className="bg-light-slate-4 rounded px-3 py-0.5">{`${node.data.contributor} - ${node.data.y}`}</div>
        )}
        nodeSize={isMobile ? 25 : 35}
        data={data}
        margin={{ top: 60, right: 60, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: isMobile ? 7 : 35, reverse: true }}
        yScale={{ type: "linear", min: 0, max: Math.max(Math.round(maxFilesModified * 2), 10) }}
        blendMode="normal"
        useMesh={false}
        annotations={[]}
        nodeComponent={CustomNode}
        axisBottom={{
          tickSize: 8,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => (value === 0 ? "Today" : value >= 35 ? "35+ days ago" : `${value} days ago`)
        }}
        enableGridX={true}
        theme={{
          axis: {},
          grid: {
            line: {
              strokeDasharray: "4 4",
              strokeWidth: 1,
              strokeOpacity: 0.7
            }
          }
        }}
        isInteractive={true}
        axisLeft={{
          tickSize: 2,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Lines Touched",
          legendPosition: "middle",
          legendOffset: -60,
          format: (value: number) => {
            return parseInt(`${value}`) >= 1000 ? humanizeNumber(value, "abbreviation") : `${value}`;
          }
        }}
      />
    </div>
  );
};

export default NivoScatterPlot;

const CustomNode = (props: any) => {
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => props.onMouseEnter?.(props.node, event),
    [props.node, props.onMouseEnter]
  );
  const handleMouseMove = useCallback(
    (event: MouseEvent) => props.onMouseMove?.(props.node, event),
    [props.node, props.onMouseMove]
  );
  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => props.onMouseLeave?.(props.node, event),
    [props.node, props.onMouseLeave]
  );
  const handleClick = useCallback(
    (event: React.MouseEvent) => props.onClick?.(props.node, event),
    [props.node, props.onClick]
  );

  console.log(props.node);
  return (
    <animated.image
      width={35}
      height={35}
      r={props.style.size.to((size: number) => size / 2)}
      y={props.style.y.to((yVal: number) => yVal - 35 / 1)}
      x={props.style.x.to((xVal: number) => xVal - 35 / 2)}
      href={props.node.data.image}
      onMouseEnter={props.isInteractive ? handleMouseEnter : undefined}
      onMouseMove={props.isInteractive ? handleMouseMove : undefined}
      onMouseLeave={props.isInteractive ? handleMouseLeave : undefined}
      onClick={props.isInteractive ? handleClick : undefined}
    />
  );
};
