import { MouseEvent, useCallback } from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { animated } from "@react-spring/web";

import humanizeNumber from "lib/utils/humanizeNumber";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

interface ScatterPlotprops {
  data: { id: string; data: { x: string | number; y: string | number; image: string }[] }[];
}
const NivoScatterPlot = ({ data }: ScatterPlotprops) => {
  const isMobile = useMediaQuery("(max-width:720px)");

  return (
    <div className="h-[400px]">
      <ResponsiveScatterPlot
        tooltip={({ node }) => <div className="bg-light-slate-4 rounded px-2">{node.serieId}</div>}
        nodeSize={isMobile ? 25 : 35}
        data={data}
        margin={{ top: 60, right: 60, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: isMobile ? 7 : 35, reverse: true }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        blendMode="normal"
        useMesh={false}
        nodeComponent={CustomNode}
        axisBottom={{
          tickSize: 8,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => (value === 0 ? "Today" : value >= 35 ? "35+ days ago" : `${value} days ago`)
        }}
        isInteractive={true}
        axisLeft={{
          tickSize: 8,
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
