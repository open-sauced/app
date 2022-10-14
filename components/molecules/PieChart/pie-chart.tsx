import React from "react";
import { PieCustomLayer, PieCustomLayerProps, PieLayer, ResponsivePie } from "@nivo/pie";

export type PieData = {
  id: string;
  label: "open" | "closed" | "merged" | "draft";
  value: number;
  color: string;
};
interface PierChartProps {
  data: PieData[];
}

const PieChart = ({ data }: PierChartProps) => {


  // Link to Nivo docs for adding center metrics to pie chart
  // https://nivo.rocks/storybook/?path=/story/pie--adding-a-metric-in-the-center-using-a-custom-layer
  
  const centerMetrics = ({ dataWithArc, centerX, centerY }: PieCustomLayerProps<PieData>) => {
    let total = 0;
    dataWithArc.forEach((datum: { value: number }) => {
      total += datum.value;
    });

    return (
      <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="central">
        {total} PRs
      </text>
    );
  };
  return (
    <div className="w-[135px] h-[135px]">
      <ResponsivePie
        data={data}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        innerRadius={0.65}
        padAngle={2}
        cornerRadius={4}
        activeInnerRadiusOffset={4}
        activeOuterRadiusOffset={4}
        colors={{ datum: "data.color" }}
        borderColor={{
          from: "color"
        }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color"
        }}
        tooltip={function (e) {
          var t = e.datum;
          return (
            <div className="bg-white py-1 px-2 rounded-lg shadow-md">
              <div className="flex gap-1 items-center text-light-slate-12 text-xs font-medium capitalize">
                <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: t.color }}></div>
                <span className="font-semibold text-light-slate-11">{t.label}:</span> {t.formattedValue} PRs
              </div>
            </div>
          );
        }}
        motionConfig="stiff"
        legends={[]}
        layers={[centerMetrics, "arcs", "arcLabels", "arcLinkLabels", "legends"]}
      />
    </div>
  );
};

export default PieChart;
