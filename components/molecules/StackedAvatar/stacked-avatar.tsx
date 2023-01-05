import { useRouter } from "next/router";

import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

import useInsight from "lib/hooks/useInsight";
export declare interface StackedAvatarProps {
  contributors: DbContribution[];
  visibleQuantity?: number;
}

const StackedAvatar = ({ contributors , visibleQuantity = 5}: StackedAvatarProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const insightId = Number.isInteger(parseInt(filterName as string, 10)) ? filterName as string : "";
  const { data: insight, isError } = useInsight(insightId);
  const repositories = insight ? insight.repos.map(repo => repo.repo_id) : [];

  if (isError) {
    console.log("Error fetching insight", isError);
    return <div>-</div>;
  }

  return (
    <div className="-space-x-3 hover:-space-x-1 flex transition-all duration-300">
      {contributors && contributors.slice(0, visibleQuantity).map(({ host_login: hostLogin }) => (
        <div
          key={`contributor-avatar-${hostLogin}`}
          className="w-8 h-8 overflow-hidden rounded-full border-2 border-solid border-white transition-all duration-300"
        >
          <AvatarHoverCard contributor={hostLogin} repositories={repositories} />
        </div>
      ))}
    </div>
  );};

export default StackedAvatar;
