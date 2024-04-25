import { FaStar } from "react-icons/fa6";
import { BiGitRepoForked } from "react-icons/bi";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { GitPullRequestIcon, HeartIcon, IssueOpenedIcon } from "@primer/octicons-react";

import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import humanizeNumber from "lib/utils/humanizeNumber";

type RepositoryStatCardProps = {
  isLoading: boolean;
  hasError: boolean;
} & (
  | {
      type: "pulls";
      stats: { opened: number; merged: number; velocity: number } | undefined;
    }
  | {
      type: "issues";
      stats: { opened: number; closed: number; velocity: number } | undefined;
    }
  | {
      type: "engagement";
      stats: { stars: number; forks: number; activity_ratio: number } | undefined;
    }
  | {
      type: "stars";
      stats: { total: number; range: number; over_range: number; average_over_range: number } | undefined;
    }
  | {
      type: "forks";
      stats: { total: number; range: number; over_range: number; average_over_range: number } | undefined;
    }
);

const titles = {
  pulls: "Pull Requests",
  issues: "Issues",
  engagement: "Engagement",
  stars: "Stars",
  forks: "Forks",
} as const;

type CardType = RepositoryStatCardProps["type"];

function getIcon(type: CardType) {
  switch (type) {
    case "pulls":
      return <GitPullRequestIcon size={18} className="text-slate-600 border-1 rounded-md p-2 h-8 w-8 shadow-xs" />;
    case "issues":
      return <IssueOpenedIcon size={18} className="text-slate-600 border-1 rounded-md p-2 h-8 w-8 shadow-xs" />;
    case "engagement":
      return <HeartIcon size={18} className="text-slate-600 border-1 rounded-md p-2 h-8 w-8 shadow-xs" />;
    case "stars":
      return <FaStar size={18} className="text-slate-600 border-1 rounded-md p-2 h-8 w-8 shadow-xs" />;
    case "forks":
      return <BiGitRepoForked size={18} className="text-slate-600 border-1 rounded-md p-2 h-8 w-8 shadow-xs" />;
  }
}

function getStatPropertiesByType(type: CardType) {
  switch (type) {
    case "pulls":
      return ["opened", "merged", "velocity"];
    case "issues":
      return ["opened", "closed", "velocity"];
    case "engagement":
      return ["stars", "forks", "activity_ratio"];
    case "forks":
    case "stars":
      return ["total", "over_range", "average_over_range"];
    default:
      throw new Error("Invalid repository stat card type");
  }
}

const getPillChart = (total?: number, loading?: boolean) => {
  if (total === undefined || loading) {
    return "-";
  }

  if (total > 7) {
    return (
      <Pill icon={<ArrowTrendingUpIcon color="green" className="w-6 h-6 lg:w-4 lg:h-4" />} text="High" color="green" />
    );
  }

  if (total >= 4 && total <= 7) {
    return (
      <Pill icon={<MinusSmallIcon color="black" className="w-6 h-6 lg:w-4 lg:h-4" />} text="Medium" color="yellow" />
    );
  }

  return <Pill icon={<ArrowTrendingDownIcon color="red" className="w-6 h-6 lg:w-4 lg:h-4" />} text="Low" color="red" />;
};

const EmptyState = ({ type, hasError }: { type: CardType; hasError: boolean }) => {
  return (
    <table className="grid gap-4 p-2">
      <caption className="flex items-center gap-1.5 text-xs">
        {getIcon(type)}
        <span aria-label={`Loading ${titles[type]} stats card`}>{titles[type]}</span>
      </caption>
      {hasError ? (
        <tbody>
          <tr>
            <td className="text-xs text-dark-red-8">An error occurred</td>
          </tr>
        </tbody>
      ) : (
        <tbody className="grid grid-cols-3 items center">
          {getStatPropertiesByType(type).map((stat) => (
            <tr key={stat} className="flex flex-col">
              <th className="capitalize font-normal text-sm text-light-slate-11 text-left">{stat}</th>
              <td className="font-medium text-3xl lg:text-2xl">
                <SkeletonWrapper width={40} height={20} />
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export const RepositoryStatCard = ({ stats, type, isLoading, hasError }: RepositoryStatCardProps) => {
  const loadEmptyState = isLoading || hasError || !stats;

  return (
    <Card className="w-full">
      {loadEmptyState ? (
        <EmptyState type={type} hasError={hasError} />
      ) : (
        <table className="grid gap-4 p-2">
          <caption className="flex items-center gap-1.5 lg:text-sm font-medium">
            {getIcon(type)}
            <span className="text-slate-700">{titles[type]}</span>
          </caption>
          <tbody className="grid grid-cols-3 items center">
            {Object.entries(stats)
              .filter(([stat]) => getStatPropertiesByType(type).includes(stat))
              .map(([stat, value]) => {
                return (
                  <tr key={stat} className="flex flex-col">
                    <th scope="row" className="capitalize font-normal text-xs lg:text-sm text-light-slate-12 text-left">
                      {type === "stars" || type === "forks"
                        ? stat === "over_range"
                          ? `Over ${stats.range} Days`
                          : stat === "average_over_range"
                          ? `Avg. per day`
                          : stat.replace("_", " ")
                        : stat.replace("_", " ")}
                      <span
                        className={`w-2 h-2 rounded-full ml-1  ${
                          stat === "opened"
                            ? "bg-light-grass-9 inline-block"
                            : stat === "closed" || stat === "merged"
                            ? "bg-purple-600 inline-block"
                            : ""
                        } `}
                      >
                        {" "}
                      </span>
                    </th>
                    {stat === "activity_ratio" ? (
                      <td className="text-black font-medium text-3xl lg:text-2xl">
                        {getPillChart(Math.round(value), isLoading)}
                      </td>
                    ) : (
                      <td className="font-medium text-3xl lg:text-2xl" title={`${value}`}>
                        {stat === "velocity" ? `${Math.round(value)}d` : humanizeNumber(value, "abbreviation")}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </Card>
  );
};
