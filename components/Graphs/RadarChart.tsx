"use client";

// If you want to make improvements to the chart or extend it, see the examples at https://ui.shadcn.com/charts#radar-chart

import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RawRadarChart } from "recharts";
import { ComponentProps } from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/primitives/chart-primitives";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface RadarChartProps {
  data: ComponentProps<typeof RawRadarChart>["data"];
  cursor?: boolean;
  radarDataKey: ComponentProps<typeof Radar>["dataKey"];
  polarAngleAxisDataKey: ComponentProps<typeof PolarAngleAxis>["dataKey"];
  children?: React.ReactNode;
  opacity?: number;
  // create an optional prop for the type that is the type of the RawRadarChart dot prop, but infer it from it's existing type
  dot?: ComponentProps<typeof Radar>["dot"];
  fill: ComponentProps<typeof Radar>["fill"];
  // If you need a diffent unit, you can add it here
  maxHeight?: `${number}${"px" | "rem"}` | "auto";
  labelFormatter?: ComponentProps<typeof ChartTooltipContent>["labelFormatter"];
  formatter?: ComponentProps<typeof ChartTooltipContent>["formatter"];
  chartTooltipContent?: ComponentProps<typeof ChartTooltip>["content"];
}

export function RadarChart({
  data,
  radarDataKey,
  polarAngleAxisDataKey,
  dot,
  fill,
  cursor = false,
  opacity = 0.6,
  maxHeight = "250px",
  chartTooltipContent,
}: RadarChartProps) {
  return (
    <ChartContainer config={chartConfig} className={`mx-auto aspect-square max-h-[${maxHeight}]`}>
      <RawRadarChart data={data}>
        <ChartTooltip
          cursor={cursor}
          content={chartTooltipContent ? chartTooltipContent : <ChartTooltipContent className="bg-white" />}
        />
        <PolarAngleAxis dataKey={polarAngleAxisDataKey} />
        <PolarGrid />
        <Radar dataKey={radarDataKey} fill={fill} fillOpacity={opacity} dot={dot} />
      </RawRadarChart>
    </ChartContainer>
  );
}
