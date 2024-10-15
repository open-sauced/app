import { FiGithub, FiGlobe } from "react-icons/fi";

export interface FavoriteRepoCardProps {
  icon: "github" | "globe";
  title: string;
  description: string;
  handleClick: () => void;
}

const InfoCard = ({ icon, title, description, handleClick }: FavoriteRepoCardProps): JSX.Element => {
  return (
    <div
      className="p-3 bg-white border-2 rounded-xl cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "enter") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center gap-2.5">
        {/* Avatar */}
        {icon === "github" && <FiGithub size={24} className="text-orange-200" />}
        {icon === "globe" && <FiGlobe size={24} className="text-orange-200" />}

        {/* Text */}
        <div className="flex flex-col justify-center">
          <div className="text-lg text-gray-700">{title}</div>
          <div className="text-sm text-gray-400 tracking-tight -mt-0.5">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
