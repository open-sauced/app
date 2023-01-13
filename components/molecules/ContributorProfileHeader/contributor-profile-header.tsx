import Avatar from "components/atoms/Avatar/avatar";
import { StaticImageData } from "next/legacy/image";
import React from "react";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Link from "next/link";

interface ContributorProfileHeaderProps {
  avatarUrl?: string;
  githubName?: string;
  isConnected: boolean;
}
const ContributorProfileHeader = ({ avatarUrl, githubName, isConnected }: ContributorProfileHeaderProps) => {
  return (
    <div className="w-full relative  bg-light-slate-6 h-[216px]">
      {isConnected && (
        <div className="relative w-full h-full">
          <Image priority alt="user profile cover image" layout="fill" objectFit="cover" src={RainbowBg} />
        </div>
      )}

      <div className="w-full absolute -top-6 px-6 md:px-12 lg:px-16 flex flex-row items-end justify-between py-6">
        <div className="translate-y-[75px]">
          <Avatar className="" hasBorder avatarURL={avatarUrl} size={184} isCircle />
        </div>
        {isConnected && (
          <div className="flex gap-3 flex-col md:flex-row items-center">
            <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${githubName}`}>
              <Button className="!px-5 !py-2 !bg-white" type="text">
                View on GitHub
              </Button>
            </a>
            <Link href="#">
              <Button className="!px-8 !py-2 !hidden" type="primary">
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
