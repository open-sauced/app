import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";

export declare interface StackedAvatarProps {
  contributors: DbContribution[];
  visibleQuantity?: number;
}
const StackedAvatar = ({ contributors , visibleQuantity = 5}: StackedAvatarProps) => (
  <div className="-space-x-3 hover:-space-x-1 flex absolute transition-all duration-300">
    {contributors && contributors.slice(0, visibleQuantity).map(({ host_login: hostLogin, first_commit_time: firstCommitTime }) => (
      <div
        key={`contributor-avatar-${hostLogin}`}
        className="w-8 h-8 overflow-hidden rounded-full border-2 border-solid border-white transition-all duration-300"
      >
        <AvatarHoverCard contributor={hostLogin} lastPr={firstCommitTime} />
      </div>
    ))}
  </div>
);

export default StackedAvatar;
