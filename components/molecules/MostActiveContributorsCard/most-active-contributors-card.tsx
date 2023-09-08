import { useSprings, animated } from "@react-spring/web";
import Image from "next/image";
import { useState } from "react";
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

const dataTypes = ["commits", "prsCreated", "prsReviewed", "issuesCreated", "comments"] as const;
const colors = {
  commits: "hsla(217, 91%, 60%, 1)",
  prsCreated: "hsla(173, 80%, 40%, 1)",
  prsReviewed: "hsla(198, 93%, 60%, 1)",
  issuesCreated: "hsla(258, 90%, 66%, 1)",
  comments: "hsla(245, 58%, 51%, 1)",
} as const;

function GraphRow({ user, maxContributions }: { user: ContributorStat; maxContributions: number }) {
  const [springs, api] = useSprings(
    dataTypes.length,
    (index: number) => ({
      from: {
        width: "0%",
      },
      to: {
        width: `${(user.contributions[dataTypes[index]] / user.totalContributions) * 100}%`,
      },
    }),
    [user.contributions, user.totalContributions, maxContributions]
  );
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
        <div className="flex items-stretch" style={{ width: `${(user.totalContributions / maxContributions) * 100}%` }}>
          {springs.map((spring, index) => (
            <animated.div
              key={dataTypes[index]}
              style={{
                backgroundColor: colors[dataTypes[index]],
                ...spring,
              }}
            >
              {" "}
            </animated.div>
          ))}
        </div>
      </div>
    </>
  );
}

interface ContributorStat {
  login: string;
  totalContributions: number;
  contributions: {
    commits: number;
    prsCreated: number;
    prsReviewed: number;
    issuesCreated: number;
    comments: number;
  };
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

export default function MostActiveContributorsCard(props: Props) {
  const [currentDateFilter, setCurrentDateFilter] = useState<keyof typeof dateFilters>("last7days"); // TODO: make this a prop
  const [currentPeopleFilter, setCurrentPeopleFilter] = useState<keyof typeof peopleFilters>("all"); // TODO: make this a prop
  const sortedData = props.data.sort((a, b) => b.totalContributions - a.totalContributions);

  const topContributor = sortedData[0];
  const allContributions = sortedData.reduce((acc, curr) => acc + curr.totalContributions, 0);
  const maxContributions = topContributor.totalContributions;
  const topContributorPercent = ((maxContributions / allContributions) * 100).toFixed(2) + "%";

  return (
    <div>
      <Card className="grid place-content-stretch overflow-hidden">
        <div className="grid p-2" style={{ gridTemplateRows: "auto auto auto 1fr auto", maxHeight: "500px" }}>
          <div className="text-lg text-slate-900 mb-2">Most active contributors</div>
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
                  {/* <Icon IconImage={SortArrowsIcon} className="w-4 h-4" /> */}
                  Most Active
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
                <GraphRow key={user.login} user={user} maxContributions={maxContributions} />
              ))}
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
