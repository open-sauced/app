import { getAvatarLink } from "lib/utils/github";
import Avatar from "../../atoms/Avatar/avatar";

export declare interface StackedAvatarProps {
  contributors: DbContribution[];
  visibleQuantity?: number;
}
const StackedAvatar = ({ contributors , visibleQuantity = 5}: StackedAvatarProps) => (
  <div className="-space-x-3 flex">
    {contributors && contributors.slice(0, visibleQuantity).map(({ host_login: hostLogin, name }, index) => (
      <div
        key={`contributor-avatar-${hostLogin}`}
        className={`w-8 h-8 overflow-hidden rounded-full border-2 border-solid border-white z-${50-(index+1)*10}`}
      >
        <Avatar key={`${hostLogin + index}`} avatarURL={getAvatarLink(hostLogin)} alt={name} size={32} hasBorder isCircle />
      </div>
    ))}
  </div>
);

export default StackedAvatar;
