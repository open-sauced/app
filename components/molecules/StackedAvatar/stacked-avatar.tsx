/* eslint-disable */

import { useRouter } from "next/router";

import clsx from "clsx";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

import useInsight from "lib/hooks/useInsight";

export type Contributor = { host_login: string };

declare interface StackedAvatarProps {
  contributors: Contributor[];
  visibleQuantity?: number;
  classNames?: string;
}

const StackedAvatar = ({ contributors, visibleQuantity = 5, classNames }: StackedAvatarProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const insightId = Number.isInteger(parseInt(filterName as string, 10)) ? (filterName as string) : "";
  const { data: insight, isError } = useInsight(insightId);
  const repositories = insight ? insight.repos.map((repo) => repo.repo_id) : [];

  if (isError) {
    console.log("Error fetching insight", isError);
    return <div>-</div>;
  }

  return (
    <div className={clsx("flex -space-x-3 transition-all duration-300 hover:-space-x-1", classNames)}>
      {contributors &&
        contributors.slice(0, visibleQuantity).map(({ host_login: hostLogin }) => (
          <div
            key={`contributor-avatar-${hostLogin}`}
            className="w-8 h-8 overflow-hidden transition-all duration-300 border-2 border-white border-solid rounded-full"
          >
            <AvatarHoverCard contributor={hostLogin} repositories={repositories} />
          </div>
        ))}
    </div>
  );
};

export default StackedAvatar;
