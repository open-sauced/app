import { useSprings, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import Icon from "components/atoms/Icon/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import { getAvatarByUsername } from "lib/utils/github";
import PeopleIcon from "img/icons/people.svg";
import CalendarIcon from "img/calendar.svg";
import ChevronDownIcon from "img/chevron-down.svg";
import SortArrowsIcon from "img/icons/sort-arrows.svg";
import SVGIcon from "components/atoms/SVGIcon/svg-icon";

// omit totalContributions and login from ContributorStat
type Stat = Omit<ContributorStat, "totalContributions" | "login">;
type StatKeys = keyof Stat;
type DataLabel = { title: string; color: string };

const dataLabelsList = {
  commits: { title: "Commits", color: "hsla(217, 91%, 60%, 1)" },
  prsCreated: { title: "Created PR", color: "hsla(173, 80%, 40%, 1)" },
  prsReviewed: { title: "Reviewed PR", color: "hsla(198, 93%, 60%, 1)" },
  issuesCreated: { title: "Created Issues", color: "hsla(258, 90%, 66%, 1)" },
  comments: { title: "Commented", color: "hsla(245, 58%, 51%, 1)" },
} satisfies Record<StatKeys, DataLabel>;

export interface ContributorStat {
  login: string;
  commits: number;
  prsCreated: number;
  prsReviewed: number;
  issuesCreated: number;
  comments: number;
}

interface Props {
  data: ContributorStat[];
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

const MostActiveCard = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="grid place-content-stretch overflow-hidden">
      <div className="grid p-2" style={{ gridTemplateRows: "auto auto auto 1fr auto", maxHeight: "500px" }}>
        <div className="text-lg text-slate-900 mb-2">Most active contributors</div>
        {children}
      </div>
    </Card>
  );
};

function getDataLabels(
  contributor: ContributorStat,
  labelList: Record<StatKeys, DataLabel>
): Record<StatKeys, DataLabel> {
  if (!contributor) {
    return {} as Record<StatKeys, DataLabel>;
  }
  const labels = Object.keys(dataLabelsList).reduce<DataLabel>(
    (acc: Record<StatKeys, DataLabel>, curr: StatKeys) => {
      if (Object.keys(contributor).includes(curr)) {
        acc[curr] = labelList[curr];
      }

      return acc;
    },
    {} as Record<StatKeys, DataLabel>
  );

  return labels;
}

function getTotalContributions(contributor: ContributorStat) {
  return Object.values(contributor).reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    }
    return acc;
  }, 0);
}

export default function MostActiveContributorsCard({ data }: Props) {
  const [currentDateFilter, setCurrentDateFilter] = useState<keyof typeof dateFilters>("last7days"); // TODO: make this a prop
  const [currentPeopleFilter, setCurrentPeopleFilter] = useState<keyof typeof peopleFilters>("all"); // TODO: make this a prop
  const sortedData = data.sort((a, b) => getTotalContributions(b) - getTotalContributions(a));
  const [topContributor] = sortedData;
  const dataLabels = getDataLabels(topContributor, dataLabelsList);

  if (data.length === 0) {
    return (
      <MostActiveCard>
        <p>No Data</p>
      </MostActiveCard>
    );
  }

  const allContributions = sortedData.reduce((acc, curr) => acc + getTotalContributions(curr), 0);
  const maxContributions = getTotalContributions(topContributor);
  const topContributorPercent = `${
    allContributions === 0 ? 0 : ((maxContributions / allContributions) * 100).toFixed(2)
  }%`;

  return (
    <MostActiveCard>
      <div className="text-sm font-medium text-slate-400 mb-4">
        {topContributor.login} made {topContributorPercent} of all code contributions
      </div>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="items-center gap-1 justify-self-end ml-auto">
              <SVGIcon IconImage={`${SortArrowsIcon.src}#icon`} className="w-4 h-4" />
              Most Active
              <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-2">
            <DropdownMenuItem className="rounded-md">Most Active</DropdownMenuItem>
            <DropdownMenuItem className="rounded-md">Least Active</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* chart */}
      <div className="relative grid place-content-stretch overflow-y-hidden mb-4">
        {/* inset shadow */}
        <div
          className="absolute left-0 bottom-0 right-0 h-4 w-full z-10"
          style={{ gridArea: "1 / 1", background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.05))" }}
        ></div>
        <div
          className="overflow-y-scroll overflow-x-hidden mb-3 pb-3 pr-3 grid gap-x-2 gap-y-3 max-w-full h-full"
          style={{
            gridArea: "1 / 1",
            gridTemplateColumns: "auto auto 1fr",
            gridAutoFlow: "row",
            alignItems: "stretch",
          }}
        >
          {sortedData.map((user) => (
            <GraphRow key={user.login} user={user} maxContributions={maxContributions} dataLabels={dataLabels} />
          ))}
        </div>
      </div>
      {/* key */}
      <div className="flex justify-center gap-4">
        {Object.entries(dataLabels).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: value.color }}></div>
            <div className="text-sm text-slate-900 capitalize">{value.title}</div>
          </div>
        ))}
      </div>
    </MostActiveCard>
  );
}

function RowTooltip({
  contributor,
  highlightedStat,
  dataLabels,
  children,
}: {
  contributor: ContributorStat;
  highlightedStat: StatKeys;
  dataLabels: Record<StatKeys, DataLabel>;
  children: React.ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={-10} align="center" collisionPadding={10} side={"bottom"} avoidCollisions>
          <div className={clsx("text-xs p-2 rounded shadow-lg bg-white font-light")}>
            <div className="text-black font-bold mb-1">{contributor.login}</div>
            {Object.entries(dataLabels).map(([key, value]) => (
              <div key={key} className={clsx("flex items-center gap-2 font-bold", { "font-bold": true })}>
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: value.color }}></div>
                <div className={clsx(key === highlightedStat ? "font-bold" : "font-light")}>
                  {key} {value.title}
                </div>
              </div>
            ))}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function getWidthPercentage(stat: number, totalContributions: number) {
  if (!stat || !totalContributions) {
    return 0;
  }

  return (stat / totalContributions) * 100;
}

function GraphRow({
  user,
  maxContributions,
  dataLabels,
}: {
  user: ContributorStat;
  maxContributions: number;
  dataLabels: Record<StatKeys, DataLabel>;
}) {
  const keys = Object.keys(dataLabels) as StatKeys[];
  const [isHovered, setIsHovered] = useState(false);
  const [springs] = useSprings(
    keys.length,
    (index: number) => ({
      from: {
        width: "0%",
      },
      to: {
        width: `${getWidthPercentage(user[keys[index]], getTotalContributions(user))}%`,
      },
    }),
    [getTotalContributions(user)]
  );

  // When hovered the tooltip should show for the the GraphRow
  const hoverGesture = useGesture({
    onHover: (state) => {
      setIsHovered(Boolean(state.hovering));
    },
  });

  return (
    <>
      <Image
        className="block w-8 h-8 rounded-full grid-cols-1"
        src={getAvatarByUsername(user.login, 64)}
        width={64}
        height={64}
        alt={user.login}
      />
      <div className="flex items-center text-sm text-slate-900 grid-cols-2">{user.login}</div>
      <div className="flex items-stretch grid-cols-3">
        <div
          className="flex items-stretch"
          style={{ width: `${(getTotalContributions(user) / maxContributions) * 100}%` }}
        >
          {springs.map((spring, index) => (
            <RowTooltip key={keys[index]} highlightedStat={keys[index]} contributor={user} dataLabels={dataLabels}>
              <animated.div
                style={{
                  backgroundColor: dataLabels[keys[index]].color,
                  ...spring,
                }}
              >
                {" "}
              </animated.div>
            </RowTooltip>
          ))}
        </div>
      </div>
    </>
  );
}
