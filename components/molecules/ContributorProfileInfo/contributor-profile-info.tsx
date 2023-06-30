/* eslint-disable react/jsx-no-undef */
import Link from "next/link";

import { AiOutlineGift } from "react-icons/ai";
import { FiClock, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import clsx from "clsx";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";
import Title from "components/atoms/Typography/title";
import Badge from "components/atoms/Badge/badge";
import { getTimeByTimezone, getTimezone } from "lib/utils/timezones";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { getFormattedDate } from "lib/utils/date-utils";

interface ContributorProfileInfoProps {
  githubName: string;
  bio?: string;
  portfolio?: string;
  twitterUsername?: string;
  interests?: string;
  isConnected?: boolean;
  timezone?: string;
  displayLocalTime?: boolean;
  githubSponsorsUrl?: string;
  linkedInUrl?: string;
  prFirstOpenedDate?: string;
}

const ContributorProfileInfo = ({
  githubName,
  twitterUsername,
  bio,
  interests,
  isConnected,
  timezone,
  displayLocalTime,
  githubSponsorsUrl,
  linkedInUrl,
  prFirstOpenedDate,
}: ContributorProfileInfoProps) => {
  const interestArray = interests?.split(",");

  return (
    <div className="flex flex-col gap-6">
      <div className="pb-6 border-b">
        <div className="flex gap-2 items-center mb-2">
          <Title className="!text-2xl !text-light-slate-12" level={3}>
            {githubName}
          </Title>
          {isConnected && <Badge text="beta" />}
        </div>
        <div className="flex items-center text-sm gap-3">
          <span className="text-light-slate-11 text-sm">{`@${githubName}`}</span>

          {isConnected && (
            <>
              {displayLocalTime && (
                <span className="flex text-light-slate-10 gap-2 items-center">
                  <Tooltip content="Time zone">
                    <FiClock className="text-light-slate-9" />
                  </Tooltip>
                  {timezone ? `UTC${getTimezone(timezone)}` : "UTC+1"}
                </span>
              )}
              <span className="flex text-light-slate-10 gap-2 items-center">
                <Tooltip content="First PR Opened Date">
                  <AiOutlineGift className="text-light-slate-9" />
                </Tooltip>
                {prFirstOpenedDate ? getFormattedDate(prFirstOpenedDate) : "June 2022"}
              </span>
            </>
          )}
        </div>
      </div>
      {isConnected && (
        <>
          <div className="flex flex-col gap-2 border-b pb-6">
            <Title className="!text-base !text-light-slate-12" level={5}>
              About
            </Title>
            <p className={clsx("text-light-slate-11 text-sm", !bio && "!text-light-slate-8")}>
              {bio || githubName + " has connected their GitHub but has not added a bio."}
            </p>
            <div className="flex flex-col text-sm mt-2 text-light-slate-9 gap-2">
              {displayLocalTime && (
                <span className="flex gap-2 items-center">
                  <FiClock className="text-light-slate-9" /> Local time:
                  <span> {getTimeByTimezone(timezone ? getTimezone(timezone) : 1)}</span>
                </span>
              )}

              {twitterUsername && (
                <span className="flex gap-2 items-center">
                  <FiTwitter className="text-light-slate-9" />
                  <Link
                    href={`https://twitter.com/${twitterUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-max hover:text-orange-500 "
                  >
                    {twitterUsername}
                  </Link>
                </span>
              )}

              {linkedInUrl && (
                <span className="flex gap-2 items-center">
                  <FiLinkedin className="text-light-slate-9" />
                  <Link href={linkedInUrl} target="_blank" rel="noreferrer" className="w-max hover:text-orange-500 ">
                    {linkedInUrl?.replace(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/, "in")}
                  </Link>
                </span>
              )}

              {githubSponsorsUrl && (
                <span className="flex gap-2 items-center">
                  <FiGithub className="text-light-slate-9" />
                  <Link
                    href={githubSponsorsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-max hover:text-orange-500 "
                  >
                    {githubSponsorsUrl?.replace(/^(http(s)?:\/\/)?([\w]+\.)?github\.com\//, "")}
                  </Link>
                </span>
              )}

              {/* <span className="flex gap-2 items-center">
                <HiOutlineMail className="text-light-slate-9" />
                <Link className="w-max hover:text-orange-500 " href="#">
                  Send a collaboration request
                </Link>
              </span> */}
            </div>
          </div>
          {interestArray && interestArray.length > 0 && (
            <div className="flex  flex-col gap-4 border-b pb-6">
              <Title className="!text-base !text-light-slate-12" level={5}>
                Current Interests
              </Title>
              <div className="flex gap-1.5 flex-wrap">
                {interestArray.map((interest, index) => (
                  <Link href={`/${interest}/dashboard/filter/recent`} key={index}>
                    <LanguagePill key={index} topic={interest} />
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
