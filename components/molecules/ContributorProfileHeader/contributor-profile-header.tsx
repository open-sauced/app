import Avatar from "components/atoms/Avatar/avatar";
import Image from "next/image";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Link from "next/link";
import { MarkGithubIcon } from "@primer/octicons-react";
import { User } from "@supabase/supabase-js";

interface ContributorProfileHeaderProps {
  avatarUrl?: string;
  githubName: string;
  isConnected: boolean;
  isFollowing: boolean;
  handleFollow: Function;
  handleUnfollow: Function;
  user: User | null;
  username: string | undefined;
}
const ContributorProfileHeader = ({
  avatarUrl,
  githubName,
  isConnected,
  isFollowing,
  handleFollow,
  handleUnfollow,
  username,
  user
}: ContributorProfileHeaderProps) => {
  const handleClick = () => {
    if (isFollowing) {
      if (handleUnfollow) handleUnfollow();
    }
    if (!isFollowing) {
      if (handleFollow) handleFollow();
    }
  };
  return (
    <div className="w-full relative  bg-light-slate-6 h-[216px]">
      {isConnected && (
        <div className="absolute w-full h-full">
          <Image priority alt="user profile cover image" fill={true} className="object-cover" src={RainbowBg} />
        </div>
      )}

      <div className="container flex flex-row items-end justify-between px-2 py-6 mx-auto md:px-16">
        <div className="translate-y-[65px] hidden md:inline-flex">
          <Avatar
            initialsClassName="text-[100px] -translate-y-2.5  leading-none"
            initials={githubName?.charAt(0)}
            className=""
            hasBorder
            avatarURL={isConnected ? avatarUrl : ""}
            size={184}
            isCircle
          />
        </div>
        <div className="translate-y-[125px] md:hidden ">
          <Avatar
            initialsClassName="text-[70px] -translate-y-1 leading-none"
            initials={githubName?.charAt(0)}
            className=""
            hasBorder
            avatarURL={isConnected ? avatarUrl : ""}
            size={120}
            isCircle
          />
        </div>
        {isConnected && (
          <div className="flex flex-col items-center gap-3 md:translate-y-0 translate-y-28 md:flex-row">
            {username !== user?.user_metadata.user_name && (
              <Button onClick={handleClick} className="invisible px-10 py-2 mb-6 bg-white xs:visible" variant="text">
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}

            <Link href="#">
              <Button className="hidden px-8 py-2" variant="primary">
                Collaborate
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorProfileHeader;
