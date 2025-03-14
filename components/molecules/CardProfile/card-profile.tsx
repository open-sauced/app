import { StaticImageData } from "next/image";
import Link from "next/link";

import Avatar from "components/atoms/Avatar/avatar";
import Icon from "components/atoms/Icon/icon";
import Text from "components/atoms/Typography/text";

import ForkIcon from "img/icons/fork-icon.svg";
import FirstPRIcon from "img/icons/first-pr-icon.svg";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { OscrPill } from "components/Contributors/Oscr";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface CardProfileProps {
  githubAvatar?: string | StaticImageData;
  githubName: string;
  totalPRs: number;
  dateOfFirstPR: string;
  isRoundedAvatar?: boolean;
  oscr?: number;
  loggedIn: boolean;
  oscrCalculated: boolean;
}

const CardProfile = ({
  githubAvatar,
  githubName,
  totalPRs,
  dateOfFirstPR,
  isRoundedAvatar,
  oscr,
  oscrCalculated,
  loggedIn,
}: CardProfileProps): JSX.Element => {
  return (
    <Link href={`/u/${githubName}`} as={`/u/${githubName}`}>
      <div className="flex items-center gap-2">
        <Avatar isCircle={isRoundedAvatar} size={40} avatarURL={githubAvatar ? githubAvatar : undefined} />
        <div>
          <div>
            <Text className="!text-base !text-black  ">{githubName}</Text>
          </div>
          <div className="flex gap-2 text-xs">
            <div className="flex items-center gap-1 text-xs text-light-slate-11">
              {totalPRs !== undefined && (
                <>
                  <Tooltip content="PRs merged">
                    <Icon size={12} alt="PRs merged" IconImage={ForkIcon} />
                  </Tooltip>
                  {totalPRs} PR
                  {totalPRs === 1 ? "" : "s"}
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-light-slate-11">
              <Tooltip content="First commit date">
                <Icon size={12} alt="First commit date" IconImage={FirstPRIcon} /> {dateOfFirstPR}
              </Tooltip>
            </div>
            {oscr != null || !loggedIn ? (
              <OscrPill rating={oscr} hideRating={!loggedIn} calculated={oscrCalculated} />
            ) : (
              <SkeletonWrapper count={1} width={24} height={16} radius={8} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProfile;
