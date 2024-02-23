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
);

const titles = {
  pulls: "Pull Requests",
  issues: "Issues",
  engagement: "Engagement",
} as const;

type CardType = RepositoryStatCardProps["type"];

function getIcon(type: CardType) {
  switch (type) {
    case "pulls":
      return <GitPullRequestIcon size={18} className="text-sauced-orange bg-orange-100 rounded-full p-0.5" />;
    case "issues":
      return <IssueOpenedIcon size={18} className="text-blue-600 bg-blue-100 rounded-full p-0.5" />;
    case "engagement":
      return <HeartIcon size={18} className="text-pink-600 bg-pink-100 rounded-full p-0.5" />;
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
              <th className="capitalize font-medium text-sm text-light-slate-11 text-left">{stat}</th>
              <td className="semi-bold text-2xl mt-1">
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
    <Card className="w-full lg:w-80 lg:max-w-xs lg:h-32 lg:max-h-32">
      {loadEmptyState ? (
        <EmptyState type={type} hasError={hasError} />
      ) : (
        <table className="grid gap-4 p-2">
          <caption className="flex items-center gap-1.5 lg:text-xs">
            {getIcon(type)}
            <span>{titles[type]}</span>
          </caption>
          <tbody className="grid grid-cols-3 items center">
            {Object.entries(stats)
              .filter(([stat]) => getStatPropertiesByType(type).includes(stat))
              .map(([stat, value]) => {
                return (
                  <tr key={stat} className="flex flex-col">
                    <th scope="row" className="capitalize font-medium text-lg lg:text-sm text-light-slate-11 text-left">
                      {stat.replace("_", " ")}
                    </th>
                    {stat === "activity_ratio" ? (
                      <td className="text-black semi-bold text-3xl lg:text-2xl">
                        {getPillChart(Math.round(value), isLoading)}
                      </td>
                    ) : (
                      <td className="semi-bold text-3xl lg:text-2xl" title={`${value}`}>
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
