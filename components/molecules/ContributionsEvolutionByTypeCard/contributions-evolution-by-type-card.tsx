import { ResponsiveLine } from "@nivo/line";
import { format } from "date-fns";
import Card from "components/atoms/Card/card";

const dataTypes = ["active", "new", "alumni"] as const;
type Stat = (typeof dataTypes)[number];

const dataLabels = {
  active: "Active",
  new: "New",
  alumni: "Alumni",
} as const satisfies Record<Stat, string>;

const colors = {
  active: "#46a758", // green
  new: "#0ea5e9", // blue
  alumni: "#f59e0b", // orange
} as const satisfies Record<Stat, string>;

export interface ContributionEvolutionByTypeDatum {
  time_start: string;
  time_end: string;
  active: number;
  new: number;
  alumni: number;
  all: number;
}

interface ContributionsEvolutionByTypeProps {
  data?: ContributionEvolutionByTypeDatum[];
  isLoading: boolean;
}

export default function ContributionsEvolutionByType({ data = [], isLoading }: ContributionsEvolutionByTypeProps) {
  /*
   Group the data by kind of contributor 'active', 'new', 'churned'
   format it like so:

   [
      {
        id: 'active',
        color: colors['active'],
        data: [
          {
            x: '01/01',
            y: 10
          },
          {
            x: '01/02',
            y: 20
          },
          ...
        ],
      },
   ]
   */

  const groupedData = dataTypes.map((type) => ({
    id: dataLabels[type],
    color: colors[type],
    data: data.map((datum) => ({
      x: new Date(datum.time_start),
      y: datum[type as keyof ContributionEvolutionByTypeDatum],
    })),
  }));

  return (
    <div>
      <Card className="grid place-content-stretch overflow-hidden">
        <div
          className="grid p-2"
          style={{
            gridTemplateRows: "auto auto 1fr auto",
            maxHeight: "500px",
            minHeight: "500px",
            justifyItems: "stretch",
            alignItems: "stretch",
          }}
        >
          <div className="text-lg text-slate-900 mb-2">Contributions Evolution</div>
          <div className="text-sm font-medium text-slate-400 mb-4">This is going to be an auto-generated insight.</div>
          {/* chart */}
          <div className="sr-only" aria-live="polite">
            {isLoading ? "Loading the contributions evolution graph" : "The contributions evolution graph has loaded"}
          </div>
          {isLoading ? (
            <div className="loading mb-4 rounded" />
          ) : (
            <div className="mb-3 grid" style={{ height: "auto" }}>
              <div>
                <ResponsiveLine
                  data={groupedData}
                  lineWidth={3}
                  enablePoints={false}
                  enableGridX={false}
                  enablePointLabel={false}
                  enableCrosshair={true}
                  enableSlices="x"
                  isInteractive={true}
                  useMesh={true}
                  xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    useUTC: false,
                    precision: "day",
                  }}
                  xFormat="time:%Y-%m-%d"
                  yScale={{
                    type: "linear",
                  }}
                  axisLeft={{ tickValues: 5, tickSize: 0 }}
                  axisBottom={{
                    format: (value) => format(value, "MM/dd"),
                    tickSize: 0,
                  }}
                  margin={{ top: 20, right: 40, bottom: 30, left: 40 }}
                  motionConfig="stiff"
                  curve="monotoneX"
                  colors={(d) => d.color}
                />
              </div>
            </div>
          )}
          {/* key */}
          <div className="flex justify-center gap-4">
            {dataTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[type] }}></div>
                <div className="text-sm text-slate-900 capitalize">{type}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
