import { GitPullRequestIcon, HeartIcon, IssueOpenedIcon } from "@primer/octicons-react";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type RepositoryStatCardProps = {
  isLoading: boolean;
} & (
  | {
      type: "pulls";
      stats: { opened: number; merged: number; velocity: number };
    }
  | {
      type: "issues";
      stats: { opened: number; closed: number; velocity: number };
    }
  | {
      type: "engagement";
      stats: { stars: number; forks: number; health: number };
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

function getHeadings(type: CardType) {
  switch (type) {
    case "pulls":
      return ["opened", "merged", "velocity"];
    case "issues":
      return ["opened", "closed", "velocity"];
    case "engagement":
      return ["stars", "forks", "health"];
    default:
      throw new Error("Invalid repository stat card type");
  }
}

const EmptyState = ({ type }: { type: CardType }) => {
  return (
    <table className="grid gap-4 p-2">
      <caption className="flex items-center gap-1.5 text-xs">
        {getIcon(type)}
        <span aria-label={`Loading ${titles[type]} stats card`}>{titles[type]}</span>
      </caption>
      <tbody className="grid grid-cols-3 items center">
        {getHeadings(type).map((stat) => (
          <tr key={stat} className="flex flex-col">
            <th className="capitalize font-medium text-sm text-light-slate-11 text-left">{stat}</th>
            <td className="semi-bold text-2xl mt-1">
              <SkeletonWrapper width={40} height={20} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const RepositoryStatCard = ({ stats, type, isLoading }: RepositoryStatCardProps) => {
  return (
    <Card className="w-80 max-w-xs h-32 max-h-32">
      {isLoading ? (
        <EmptyState type={type} />
      ) : (
        <table className="grid gap-4 p-2">
          <caption className="flex items-center gap-1.5 text-xs">
            {getIcon(type)}
            <span>{titles[type]}</span>
          </caption>
          <tbody className="grid grid-cols-3 items center">
            {Object.entries(stats).map(([stat, value]) => (
              <tr key={stat} className="flex flex-col">
                <th scope="row" className="capitalize font-medium text-sm text-light-slate-11 text-left">
                  {stat}
                </th>
                {stat === "health" ? (
                  <td className="text-black semi-bold text-2xl">
                    {value}
                    <span className="text-xs">/10</span>
                  </td>
                ) : (
                  <td className="semi-bold text-2xl">{stat === "velocity" ? `${Math.round(value)}d` : value}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};
