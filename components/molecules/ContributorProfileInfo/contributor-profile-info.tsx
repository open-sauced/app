/* eslint-disable react/jsx-no-undef */
import Link from "next/link";

import { AiOutlineGift } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { FiClock, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaGlobe, FaXTwitter } from "react-icons/fa6";
import clsx from "clsx";
import Title from "components/atoms/Typography/title";
import Badge from "components/atoms/Badge/badge";
import { getTimeByTimezone, getTimezone } from "lib/utils/timezones";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { getFormattedDate } from "lib/utils/date-utils";
import { InterestType } from "lib/utils/getInterestOptions";
import { LanguagePill } from "components/shared/LanguagePill/LanguagePill";

interface ContributorProfileInfoProps {
  githubName: string;
  bio?: string;
  portfolio?: string;
  twitterUsername?: string;
  interests?: string;
  isConnected?: boolean;
  timezone?: string;
  displayLocalTime?: boolean;
  url?: string;
  githubSponsorsUrl?: string;
  linkedInUrl?: string;
  discordUrl?: string;
  prFirstOpenedDate?: string;
  isMaintainer?: boolean;
  followerCount?: number;
  followingCount?: number;
}

const ContributorProfileInfo = ({
  githubName,
  twitterUsername,
  bio,
  interests,
  isConnected,
  timezone,
  displayLocalTime,
  url,
  githubSponsorsUrl,
  linkedInUrl,
  discordUrl,
  prFirstOpenedDate,
  isMaintainer,
  followerCount,
  followingCount,
}: ContributorProfileInfoProps) => {
  const interestArray = interests?.split(",").filter(Boolean) as InterestType[];
  const discordUserId = discordUrl?.match(/\d{17,}$/)?.[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="pb-6 border-b">
        <div className="flex gap-2 items-center mb-2">
          <Title className="!text-2xl" level={3}>
            {githubName}
          </Title>
          {isMaintainer && <Badge text="maintainer" />}
        </div>
        <div className="flex items-center text-sm gap-3">
          {isConnected && (
            <>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                  <span className="font-semibold text-sm"> {followerCount} </span>
                  <span className="font-normal text-light-slate-11 text-sm"> followers</span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="font-semibold text-sm"> {followingCount} </span>
                  <span className="font-normal text-light-slate-11 text-sm"> following</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isConnected && (
        <>
          <div className="flex flex-col gap-2 border-b pb-6">
            <Title className="!text-base" level={5}>
              About
            </Title>
            <p className={clsx(" text-sm", !bio && "")}>
              {bio || githubName + " has connected their GitHub but has not added a bio."}
            </p>
            <div className="flex flex-col text-sm mt-2  gap-2">
              {displayLocalTime && (
                <span className="flex gap-2 items-center">
                  <FiClock />
                  <span>
                    {getTimeByTimezone(timezone ? getTimezone(timezone) : 1)}{" "}
                    {timezone ? `(UTC${getTimezone(timezone)})` : "(UTC+1)"}
                  </span>
                </span>
              )}

              {url && (
                <span className="flex gap-2 items-center">
                  <FaGlobe />
                  <Link href={url} target="_blank" className="w-max hover:text-orange-500 ">
                    {url}
                  </Link>
                </span>
              )}

              <span className="flex gap-2 items-center">
                <Tooltip content="First PR Opened Date">
                  <AiOutlineGift className="" />
                </Tooltip>
                {prFirstOpenedDate ? getFormattedDate(prFirstOpenedDate) : "June 2022"}
              </span>

              <span className="flex gap-2 items-center">
                <FiGithub />
                <Link
                  href={`https://github.com/${githubName}`}
                  target="_blank"
                  className="w-max hover:text-orange-500 "
                >
                  {githubName}
                </Link>
              </span>

              {twitterUsername && (
                <span className="flex gap-2 items-center">
                  <FaXTwitter />
                  <Link
                    href={`https://twitter.com/${twitterUsername}`}
                    target="_blank"
                    className="w-max hover:text-orange-500 "
                  >
                    {twitterUsername}
                  </Link>
                </span>
              )}

              {linkedInUrl && (
                <span className="flex gap-2 items-center">
                  <FiLinkedin />
                  <Link href={linkedInUrl} target="_blank" className="w-max hover:text-orange-500 ">
                    {linkedInUrl?.replace(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/, "in")}
                  </Link>
                </span>
              )}

              {discordUrl && (
                <span className="flex gap-2 items-center">
                  <BsDiscord />
                  <Link href={discordUrl} target="_blank" className="w-max hover:text-orange-500">
                    {`discord/#${discordUserId}`}
                  </Link>
                </span>
              )}

              {githubSponsorsUrl && (
                <span className="flex gap-2 items-center">
                  <FiGithub />
                  <Link href={githubSponsorsUrl} target="_blank" className="w-max hover:text-orange-500 ">
                    {githubSponsorsUrl?.replace(/^(http(s)?:\/\/)?([\w]+\.)?github\.com\//, "")}
                  </Link>
                </span>
              )}

              {/* <span className="flex gap-2 items-center">
                <HiOutlineMail />
                <Link className="w-max hover:text-orange-500 " href="#">
                  Send a connections request
                </Link>
              </span> */}
            </div>
          </div>
          {interestArray && interestArray.length > 0 && (
            <div className="flex  flex-col gap-4 border-b pb-6">
              <Title className="!text-base" level={5}>
                Current Interests
              </Title>
              <div className="flex gap-1.5 flex-wrap">
                {interestArray.map((interest, index) => (
                  <Link href={`/explore/topic/${interest}/dashboard/filter/recent`} key={index} className="rounded-3xl">
                    <LanguagePill topic={interest} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContributorProfileInfo;
