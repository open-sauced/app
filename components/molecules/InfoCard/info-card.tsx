import { FiGithub } from "react-icons/fi";
import type { StaticImageData } from "next/image";

export interface FavoriteRepoCardProps {
  avatarURL: string | StaticImageData;
  title: string;
  description: string;
  handleClick: () => void;
}

const InfoCard = ({ avatarURL, title, description, handleClick }: FavoriteRepoCardProps): JSX.Element => {
  return (
    <div className="p-3 bg-white border-2 rounded-xl cursor-pointer" onClick={handleClick}>
      <div className="flex items-center gap-2.5 h-10">
        {/* Avatar */}
        <FiGithub />
        {/* <Avatar className="shrink-0 min-w-10 min-h-10" size={40} avatarURL={avatarURL} isCircle={false} /> */}

        {/* Text */}
        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-700">{title}</div>
          <div className="text-lg text-gray-500 tracking-tight -mt-0.5">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
