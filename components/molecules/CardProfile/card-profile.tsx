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
      <Avatar size="lg"
        avatarURL={githubAvatar ? githubAvatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"}/>
      <div>
        <div>
          <Text className="!text-base !text-black font-medium">{githubName}</Text>
        </div>
        <div className="flex gap-2">
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