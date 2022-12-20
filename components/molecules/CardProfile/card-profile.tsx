import { StaticImageData } from "next/image";
import Avatar from "components/atoms/Avatar/avatar";
import Icon from "components/atoms/Icon/icon";
import ForkIcon from "public/icons/fork-icon.svg";
import FirstPRIcon from "public/icons/first-pr-icon.svg";
import Text from "components/atoms/Typography/text";

interface CardProfileProps {
  githubAvatar?: string | StaticImageData;
  githubName: string;
  totalPRs: number;
  dateOfFirstPR: string;
}

const CardProfile = ({ githubAvatar, githubName, totalPRs, dateOfFirstPR }: CardProfileProps): JSX.Element => {
  return (
    <a href={`https://www.github.com/${githubName}`} target="_blank" className="flex items-center gap-2" rel="noreferrer">
      <Avatar size={40} avatarURL={githubAvatar ? githubAvatar : undefined} />
      <div>
        <div>
          <Text className="!text-base !text-black  ">{githubName}</Text>
        </div>
        <div className="flex gap-2   text-xs">
          <div className="flex text-xs items-center gap-1 text-light-slate-11">
            {totalPRs !== undefined && (
              <>
                <Icon size={12} alt="Total Pull-Requests" IconImage={ForkIcon} /> {totalPRs} PR
                {totalPRs === 1 ? "" : "s"}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-light-slate-11">
            <Icon size={12} alt="Time from First Pull Request" IconImage={FirstPRIcon} /> {dateOfFirstPR}
          </div>
        </div>
      </div>
    </a>
  );
};

export default CardProfile;
