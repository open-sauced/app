import { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { format } from "date-fns";
import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Icon from "components/atoms/Icon/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import PeopleIcon from "img/icons/people.svg";
import CalendarIcon from "img/calendar.svg";
import ChevronDownIcon from "img/chevron-down.svg";
import SVGIcon from "components/atoms/SVGIcon/svg-icon";

const dataTypes = ["active", "new", "churned"] as const;
type Stat = (typeof dataTypes)[number];

const dataLabels = {
  active: "Active",
  new: "New",
  churned: "Churned",
} as const satisfies Record<Stat, string>;

const colors = {
  active: "#46a758", // green
  new: "#0ea5e9", // blue
  churned: "#f59e0b", // orange
} as const satisfies Record<Stat, string>;

interface ContributionEvolutionByTypeDatum {
  startTime: string;
  active: number;
  new: number;
  churned: number;
}

interface Props {
  data: ContributionEvolutionByTypeDatum[];
}

const dateFilters = {
  last7days: "Last 7 days",
  last30days: "Last 30 days",
  last3months: "Last 3 months",
};

const peopleFilters = {
  all: "All Contributors",
  active: "Active Contributors",
  new: "New Contributors",
  churned: "Churned Contributors",
};

export default function ContributionsEvolutionByType(props: Props) {
  const [currentDateFilter, setCurrentDateFilter] = useState<keyof typeof dateFilters>("last7days"); // TODO: make this a prop
  const [currentPeopleFilter, setCurrentPeopleFilter] = useState<keyof typeof peopleFilters>("all"); // TODO: make this a prop

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
    data: props.data.map((datum) => ({
      x: new Date(datum.startTime),
      y: datum[type],
    })),
  }));
  console.log(groupedData);

  return (
    <div>
      <Card className="grid place-content-stretch overflow-hidden">
        <div
          className="grid p-2"
          style={{
            gridTemplateRows: "auto auto auto 1fr auto",
            maxHeight: "500px",
            minHeight: "500px",
            justifyItems: "stretch",
            alignItems: "stretch",
          }}
        >
          <div className="text-lg text-slate-900 mb-2">Contributions Evolution</div>
          <div className="text-sm font-medium text-slate-400 mb-4">This is going to be an auto-generated insight.</div>
          {/* buttons */}
          <div className="flex gap-1 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="items-center gap-1">
                  <Icon IconImage={CalendarIcon} className="w-4 h-4" />
                  {dateFilters[currentDateFilter]}
                  <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                {Object.entries(dateFilters).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    className="rounded-md !cursor-pointer"
                    onClick={() => setCurrentDateFilter(key as keyof typeof dateFilters)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="items-center gap-1">
                  <SVGIcon IconImage={`${PeopleIcon.src}#icon`} className="w-4 h-4" />
                  {peopleFilters[currentPeopleFilter]}
                  <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                {Object.entries(peopleFilters).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    className="rounded-md !cursor-pointer"
                    onClick={() => setCurrentPeopleFilter(key as keyof typeof peopleFilters)}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* chart */}
          <div className="mb-3 grid " style={{ height: "auto" }}>
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
