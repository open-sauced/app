import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { format } from "date-fns";
import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Icon from "components/atoms/Icon/icon";
import PersonIcon from "img/icons/person.svg";
import CalendarIcon from "img/calendar.svg";
import ChevronDownIcon from "img/chevron-down.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

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

interface ContributionStat extends BarDatum {
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

export default function ContributionsEvolutionCard(props: Props) {
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
          <div className="text-lg text-slate-900 mb-2">Contributions Evolution</div>
          <div className="text-sm font-medium text-slate-400 mb-4">This is going to be an auto-generated insight.</div>
          {/* buttons */}
          <div className="flex gap-1 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="items-center gap-1">
                  <Icon IconImage={CalendarIcon} className="w-4 h-4" />
                  Last 7 days
                  <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                <DropdownMenuItem className="rounded-md">One</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">Two</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">Three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  <Icon IconImage={PersonIcon} className="w-4 h-4" />
                  All Contributors
                  <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-2">
                <DropdownMenuItem className="rounded-md">One</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">Two</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">Three</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* chart */}
          <div className="mb-3 grid " style={{ height: "auto" }}>
            <div>
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
                motionConfig="gentle"
                padding={0.5}
                colors={(d) => colors[d.id as keyof typeof colors]}
                tooltipLabel={(d) => labels[d.id as keyof typeof labels]}
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
