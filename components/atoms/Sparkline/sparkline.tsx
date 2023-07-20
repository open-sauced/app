import { ResponsiveLine, Serie } from "@nivo/line";
import React from "react";

interface SparklineProps {
  width?: string | number;
  height?: string | number;
  data?: Serie[];
}

const Sparkline: React.FC<SparklineProps> = ({ width = 120, height = 40, data = [] }) => {
  return (
    <div style={{ height: height, width: width }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        isInteractive={false}
        legends={[]}
      />
    </div>
  );
};

export default Sparkline;
