import Title from "components/atoms/Typography/title";
import { generateApiPrUrl } from "lib/utils/github";
import React from "react";
import PullRequestHighlightCard from "../PullRequestHighlightCard/pull-request-highlight-card";
import { useFetchGithubPRInfo } from "lib/hooks/useFetchGithubPRInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/atoms/Dropdown/dropdown";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiLinkedin, FiTwitter } from "react-icons/fi";
import { BsLink45Deg } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  prLink: string;
}
const ContributorHighlightCard = ({ title, desc, prLink }: ContributorHighlightCardProps) => {
  const { data, isLoading, isError } = useFetchGithubPRInfo(generateApiPrUrl(prLink));

  return (
    <article className="flex flex-col max-w-[40rem] flex-1 gap-3 lg:gap-6">
      <div className="flex justify-between items-center">
        {title && (
          <Title className="!text-sm lg:!text-xl !text-light-slate-12" level={4}>
            {title}
          </Title>
        )}
        <div className="flex ml-auto lg:gap-3 gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="py-2 px-2 rounded-full data-[state=open]:bg-light-slate-7">
              <HiOutlineEmojiHappy size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className=" py-2 px-2 rounded-full data-[state=open]:bg-light-slate-7">
              <TfiMoreAlt size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg flex flex-col py-2 gap-1">
              <DropdownMenuItem>
                <div className="flex gap-2.5 py-1 items-center pl-3 pr-7">
                  <FiTwitter size={22} />
                  <span>Share to Twitter</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-2.5 py-1 items-center pl-3 pr-7">
                  <FiLinkedin size={22} />
                  <span>Share to Linkedin</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-2.5 py-1 items-center pl-3 pr-7">
                  <BsLink45Deg size={22} />
                  <span>Copy link</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-2.5 py-1  items-center pl-3 pr-7">
                  <FaUserPlus size={22} />
                  <span>Follow user</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-2.5 py-1  items-center pl-3 pr-7">
                  <GrFlag size={22} />
                  <span>Report content</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Highlight body section */}
      <div>
        <p className="text-light-slate-11 text-sm lg:text-base font-normal">{desc}</p>
      </div>
      {/* Highlight Link section */}

      <div>
        <a href={prLink} className="underline text-sauced-orange cursor-pointer">
          {prLink}
        </a>
      </div>

      {/* Generated OG card section */}
      {isLoading && <SkeletonWrapper height={250} />}
      {isError && <>An error occured...</>}
      {data && (
        <div>
          <PullRequestHighlightCard prLink={prLink} />
        </div>
      )}
    </article>
  );
};

export default ContributorHighlightCard;
