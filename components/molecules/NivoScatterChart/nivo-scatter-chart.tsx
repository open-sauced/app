import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import humanizeNumber from "lib/utils/humanizeNumber";
import { animated } from "@react-spring/web";
import Image from "next/image";

interface ScatterPlotprops {
  data: { id: string; data: { x: string | number; y: string | number; image: string }[] }[];
}
const NivoScatterPlot = ({ data }: ScatterPlotprops) => {
  return (
    <div className="h-[400px]">
      <ResponsiveScatterPlot
        tooltip={({}) => <div className="bg-red-300 rounded px-2">Hello world</div>}
        nodeSize={35}
        data={data}
        margin={{ top: 60, right: 60, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: 35, reverse: true }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        blendMode="normal"
        useMesh={false}
        nodeComponent={textLayer}
        axisBottom={{
          tickSize: 8,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => (value === 0 ? "Today" : value === 35 ? "35+ days ago" : `${value} days ago`)
        }}
        axisLeft={{
          tickSize: 8,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Lines Touched",
          legendPosition: "middle",
          legendOffset: -60,
          format: (value: number) => {
            return parseInt(`${value}`) >= 1000 ? humanizeNumber(value, "abbreviation") : `${value}`;
          },
          ariaHidden: true
        }}
      />
    </div>
  );
};

export default NivoScatterPlot;

const textLayer = (props) => {
  console.log(props);
  return (
    <animated.image
      width={35}
      height={35}
      r={props.style.size.to((size: number) => size / 2)}
      y={props.style.y}
      x={props.style.x}
      href={props.node.data.image}
    />
  );
};
