import dynamic from "next/dynamic";
import { format } from "date-fns";
import { useState } from "react";
import Button from "components/shared/Button/button";
import Card from "components/atoms/Card/card";
import Icon from "components/atoms/Icon/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import SVGIcon from "components/atoms/SVGIcon/svg-icon";
import PeopleIcon from "img/icons/people.svg";
import CalendarIcon from "img/calendar.svg";
import ChevronDownIcon from "img/chevron-down.svg";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import type { BarDatum } from "@nivo/bar";

const dataTypes = ["commits", "prsCreated", "prsReviewed", "issuesCreated", "comments"] as const;
const colors = {
  commits: "hsla(217, 91%, 60%, 1)",
  prsCreated: "hsla(173, 80%, 40%, 1)",
  prsReviewed: "hsla(198, 93%, 60%, 1)",
  issuesCreated: "hsla(258, 90%, 66%, 1)",
  comments: "hsla(245, 58%, 51%, 1)",
} as const;

const labels = {
  commits: "Commits",
  prsCreated: "PRs Created",
  prsReviewed: "PRs Reviewed",
  issuesCreated: "Issues Created",
  comments: "Comments",
} as const;

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

export interface ContributionStat extends BarDatum {
  startTime: string;
  commits: number;
  prsCreated: number;
  prsReviewed: number;
  issuesCreated: number;
  comments: number;
}

interface Props {
  data: ContributionStat[];
}

// Use dynamic() to import BarDatum & ResponsiveBar from @nivo/bar
const ResponsiveBar = dynamic(() => import("@nivo/bar").then((module) => module.ResponsiveBar));

export default function ContributionsEvolutionCard(props: Props) {
  const [currentDateFilter, setCurrentDateFilter] = useState<keyof typeof dateFilters>("last7days"); // TODO: make this a prop
  const [currentPeopleFilter, setCurrentPeopleFilter] = useState<keyof typeof peopleFilters>("all"); // TODO: make this a prop

  const formattedData = props.data.map((datum) => ({
    ...datum,
    startTime: format(new Date(datum.startTime), "MM/dd"),
  }));
  return (
    <div>
      <Card className="grid place-content-stretch overflow-hidden">
        <div
          className="grid p-2 overflow-hidden"
          style={{
            gridTemplateRows: "auto auto auto 1fr auto",
            maxHeight: "500px",
            minHeight: "500px",
            justifyItems: "stretch",
            alignItems: "stretch",
          }}
        >
          <h2 className="font-medium text-lg text-slate-900 mb-2">Contributions Evolution</h2>
          <div className="text-sm text-slate-400 mb-4">This is going to be an auto-generated insight.</div>
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
              <ClientOnly>
                <ResponsiveBar
                  data={formattedData}
                  keys={dataTypes as unknown as string[]}
                  indexBy={"startTime"}
                  axisBottom={{ tickSize: 0 }}
                  axisLeft={null}
                  enableLabel={false}
                  enableGridY={false}
                  labelFormat={""}
                  margin={{ top: 0, right: 40, bottom: 30, left: 40 }}
                  motionConfig="stiff"
                  padding={0.5}
                  colors={(d) => colors[d.id as keyof typeof colors]}
                  tooltipLabel={(d) => labels[d.id as keyof typeof labels]}
                />
              </ClientOnly>
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
