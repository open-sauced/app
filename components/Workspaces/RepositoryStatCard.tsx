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

const EmptyState = ({ type }: { type: CardType }) => {
  let headings;

  switch (type) {
    case "pulls":
      headings = ["opened", "merged", "velocity"];
      break;
    case "issues":
      headings = ["opened", "closed", "velocity"];
      break;
    case "engagement":
      headings = ["stars", "forks", "health"];
      break;
  }

  return (
    <div className="grid gap-4 p-2">
      <div className="flex items-center gap-1.5 text-xs">
        {getIcon(type)}
        <span>{titles[type]}</span>
      </div>
      <div className="grid grid-cols-3 items-center">
        {headings.map((heading) => (
          <div key={heading} className="flex flex-col items-center justify-center">
            <div className="capitalize font-medium text-sm text-light-slate-11">{heading}</div>
            <SkeletonWrapper width={40} height={28} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const RepositoryStatCard = ({ stats, type, isLoading }: RepositoryStatCardProps) => {
  return (
    <Card className="w-80 max-w-xs">
      {isLoading ? (
        <EmptyState type={type} />
      ) : (
        <div className="grid gap-4 p-2">
          <div className="flex items-center gap-1.5 text-xs">
            {getIcon(type)}
            <span>{titles[type]}</span>
          </div>
          <div className="grid grid-cols-3 items center">
            {Object.entries(stats).map(([stat, value]) => (
              <div key={stat} className="flex flex-col items-center justify-center">
                <div className="capitalize font-medium text-sm text-light-slate-11">{stat}</div>
                {stat === "health" ? (
                  <div className="text-black semi-bold text-2xl">
                    {value}
                    <span className="text-xs">/10</span>
                  </div>
                ) : (
                  <div className="semi-bold text-2xl">
                    {value}
                    {stat === "velocity" ? "d" : ""}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
