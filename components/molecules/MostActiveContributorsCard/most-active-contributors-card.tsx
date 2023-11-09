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
import ChevronDownIcon from "img/chevron-down.svg";
import SVGIcon from "components/atoms/SVGIcon/svg-icon";

// omit total_contributions and login from ContributorStat
type StatKeys = keyof Omit<ContributorStat, "total_contributions" | "login">;
type DataLabel = { title: string; color: string };

const dataLabelsList = {
  commits: { title: "Commits", color: "hsla(217, 91%, 60%, 1)" },
  prs_created: { title: "Created PRs", color: "hsla(173, 80%, 40%, 1)" },
  prs_reviewed: { title: "Reviewed PRs", color: "hsla(198, 93%, 60%, 1)" },
  issues_created: { title: "Created Issues", color: "hsla(258, 90%, 66%, 1)" },
  comments: { title: "Commented", color: "hsla(245, 58%, 51%, 1)" },
} satisfies Record<StatKeys, DataLabel>;

export interface ContributorStat {
  login: string;
  commits: number;
  prs_created: number;
  prs_reviewed: number;
  issues_created: number;
  comments: number;
  total_contributions: number;
}

export type ContributorType = "all" | "active" | "new" | "alumni";

interface Props {
  topContributor?: ContributorStat;
  data: ContributorStat[];
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
  isLoading: boolean;
  totalContributions: number;
}

const peopleFilters: Record<ContributorType, string> = {
  all: "All Contributors",
  active: "Active Contributors",
  new: "New Contributors",
  alumni: "Churned Contributors",
};

const MostActiveCard = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="grid place-content-stretch overflow-hidden">
      <div
        className="grid p-2 relative"
        style={{
          gridTemplateRows: "auto auto auto 1fr auto",
          height: "500px",
          minHeight: "500px",
          maxHeight: "500px",
        }}
      >
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
  const labels = Object.keys(dataLabelsList).reduce<Record<StatKeys, DataLabel>>(
    (acc, curr) => {
      if (Object.keys(contributor).includes(curr)) {
        acc[curr as StatKeys] = labelList[curr as StatKeys];
      }

      return acc;
    },
    {} as Record<StatKeys, DataLabel>
  );

  return labels;
}

export default function MostActiveContributorsCard({
  data,
  topContributor,
  setContributorType,
  contributorType,
  isLoading,
  totalContributions,
}: Props) {
  const dataLabels = getDataLabels(topContributor!, dataLabelsList);
  const labels = Object.keys(dataLabels);
  const maxContributions = topContributor?.total_contributions ?? 0;
  const topContributorPercent = `${
    totalContributions === 0 ? 0 : ((maxContributions / totalContributions) * 100).toFixed(2)
  }%`;

  return (
    <MostActiveCard>
      <>
        {topContributor && (
          <div className="text-sm font-medium text-slate-400 mb-4">
            {topContributor.login} made {topContributorPercent} of all code contributions
          </div>
        )}

        {/* buttons */}
        <div className="flex gap-1 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="items-center gap-1">
                <SVGIcon IconImage={`${PeopleIcon.src}#icon`} className="w-4 h-4" />
                {peopleFilters[contributorType]}
                <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-2">
              {Object.entries(peopleFilters).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  className="rounded-md !cursor-pointer"
                  onClick={() => setContributorType(key as keyof typeof peopleFilters)}
                >
                  {value}
                </DropdownMenuItem>
              ))}
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
              gridTemplateRows: "repeat(auto-fit, 32px)",
              gridAutoFlow: "row",
              alignItems: "stretch",
            }}
          >
            {!isLoading && data.length === 0 ? (
              <p>No data</p>
            ) : (
              <>
                {isLoading ? (
                  <GraphLoading />
                ) : (
                  data.map((user) => (
                    <GraphRow
                      key={user.login}
                      user={user}
                      maxContributions={maxContributions}
                      dataLabels={dataLabels}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </>

      {/* key */}
      <div className="flex justify-center gap-4 flex-wrap">
        {Object.entries(dataLabelsList).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-2"
            {...(labels.includes(key) ? null : { title: "coming soon" })}
          >
            <div
              className={`w-3 h-3 rounded-sm ${labels.includes(key) ? "" : "bg-slate-200"}`}
              style={labels.includes(key) ? { backgroundColor: value.color } : {}}
            ></div>
            <div className="text-sm text-slate-900 capitalize">{value.title}</div>
          </div>
        ))}
      </div>
    </MostActiveCard>
  );
}

function RowTooltip({
  contributor,
  dataLabels,
  children,
}: {
  contributor: ContributorStat;
  dataLabels: Record<StatKeys, DataLabel>;
  children: React.ReactNode;
}) {
  const labels = Object.keys(dataLabels);
  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={-10} align="center" collisionPadding={10} side={"bottom"} avoidCollisions>
          <div className={clsx("text-xs p-2 rounded shadow-lg bg-white font-light")}>
            <div className="text-black font-bold mb-1">{contributor.login}</div>
            {Object.entries(dataLabelsList)
              .filter(([key]) => labels.includes(key))
              .map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 font-bold">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: value.color }}></div>
                  <div className="font-light">{value.title}</div>
                </div>
              ))}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function getWidthPercentage(stat: number, total_contributions: number) {
  if (!stat || !total_contributions) {
    return 0;
  }

  return (stat / total_contributions) * 100;
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
        width: `${getWidthPercentage(user[keys[index]], user.total_contributions)}%`,
      },
    }),
    [user.total_contributions]
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
          style={{ width: `${(user.total_contributions / maxContributions) * 100}%` }}
        >
          {springs.map((spring, index) => (
            <RowTooltip key={keys[index]} contributor={user} dataLabels={dataLabels}>
              <animated.div
                style={{
                  backgroundColor: dataLabels[keys[index]].color,
                  ...spring,
                }}
              />
            </RowTooltip>
          ))}
        </div>
      </div>
    </>
  );
}

const GraphLoading = ({ rows = 7 }: { rows?: number }) => {
  return (
    <>
      {new Array(rows).fill(0).map((_, index) => (
        <>
          <div className="loading rounded-full w-8 h-8" />
          <div className="loading" />
          <div className="loading" />
        </>
      ))}
    </>
  );
};
