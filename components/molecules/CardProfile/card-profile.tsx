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
    <div className="flex gap-2">
      <Avatar
        size={40}
        avatarURL={githubAvatar ? githubAvatar : undefined}
      />
      <div>
        <div>
          <Text className="!text-base !text-black font-medium">{githubName}</Text>
        </div>
        <div className="flex justify-between gap-2">
          <div className="gap-2 text-light-slate-11">
            <Icon alt="Total Pull-Requests" IconImage={ForkIcon} /> {totalPRs}
          </div>
          <div className="gap-2 text-light-slate-11">
            <Icon alt="Time from First Pull Request" IconImage={FirstPRIcon} /> {dateOfFirstPR}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;