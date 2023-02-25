import Avatar from "components/atoms/Avatar/avatar";
import Image from "next/image";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Link from "next/link";
import { MarkGithubIcon } from "@primer/octicons-react";

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
          <Image priority alt="user profile cover image" fill={true} className="object-cover" src={RainbowBg} />
        </div>
      )}

      <div className="w-full absolute -top-6 px-6 md:px-12 lg:px-16 flex flex-row items-end justify-between py-6">
        <div className="translate-y-[75px] hidden md:inline-flex">
          <Avatar className="" hasBorder avatarURL={avatarUrl} size={184} isCircle />
        </div>
        <div className="translate-y-[125px] md:hidden ">
          <Avatar className="" hasBorder avatarURL={avatarUrl} size={120} isCircle />
        </div>
        {isConnected && (
          <div className="flex md:translate-y-0 translate-y-28 gap-3 flex-col md:flex-row items-center">

            <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${githubName}`}>
              <MarkGithubIcon size={24} className="visible xs:invisible mr-2 mb-3" />
              <Button className="invisible xs:visible px-5 py-2 bg-white" variant="text">
                View on GitHub
              </Button>
            </a>
            <Link href="#">
              <Button className="px-8 py-2 hidden" variant="primary">
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
