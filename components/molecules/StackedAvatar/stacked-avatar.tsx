import { getAvatarLink } from "lib/utils/github";
import Avatar from "../../atoms/Avatar/avatar";

export declare interface StackedAvatarProps {
  contributors: DbContribution[];
}
const StackedAvatar = ({ contributors }: StackedAvatarProps) => (
  <div className="-space-x-3 flex transition-all duration-300">
    {contributors && contributors.slice(0, 5).map(({ host_login: hostLogin, name }) => (
      <div
        key={`contributor-avatar-${hostLogin}`}
        className="w-8 h-8 overflow-hidden rounded-full transition-all duration-300 border-2 border-white"
      >
        <Avatar key={`${hostLogin}`} avatarURL={getAvatarLink(hostLogin)} alt={name} size={32} hasBorder isCircle />
      </div>
    ))}
  </div>
);

export default StackedAvatar;