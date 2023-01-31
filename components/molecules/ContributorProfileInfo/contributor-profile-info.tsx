/* eslint-disable react/jsx-no-undef */
import Link from "next/link";

import { AiOutlineGift } from "react-icons/ai";
import { FiClock, FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

import LanguagePill from "components/atoms/LanguagePill/LanguagePill";
import Title from "components/atoms/Typography/title";

interface ContributorProfileInfoProps {
  githubName: string;
  bio?: string;
  portfolio?: string;
  twitterUsername?: string;
  interests?: string;
  isConnected?: boolean;
}

const ContributorProfileInfo = ({
  githubName,
  twitterUsername,
  bio,
  interests,
  isConnected
}: ContributorProfileInfoProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="pb-6 border-b">
        <Title className="!text-2xl !text-light-slate-12" level={3}>
          {githubName}
        </Title>
        <div className="flex items-center text-sm gap-3">
          <span className="text-light-slate-11 text-sm">{`@${githubName}`}</span>

          {isConnected && (
            <>
              <span className="flex text-light-slate-10 gap-2 items-center">
                <FiClock className="text-light-slate-9" />
                UTC +1
              </span>
              <span className="flex text-light-slate-10 gap-2 items-center">
                <AiOutlineGift className="text-light-slate-9" />
                June 2022
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
            <p className="text-light-slate-11 text-sm">
              {bio ||
                "I am an open source developer with a passion for music and video games. I strive to improve the open source community and am always looking for new ways to contribute."}
            </p>
            <div className="flex flex-col text-sm mt-2 text-light-slate-9 gap-2">
              <span className="flex gap-2 items-center">
                <FiClock className="text-light-slate-9" /> Local time: 12:32 PM
              </span>

              <span className="flex gap-2 items-center">
                <FiTwitter className="text-light-slate-9" />
                <Link href="#" className="w-max hover:text-orange-500 ">
                  coming soon...
                </Link>
              </span>

              {/* <span className="flex gap-2 items-center">
                <HiOutlineMail className="text-light-slate-9" />
                <Link className="w-max hover:text-orange-500 " href="#">
                  Send a collaboration request
                </Link>
              </span> */}
            </div>
          </div>
          {interests && (
            <div className="flex flex-col gap-4 border-b pb-6">
              <Title className="!text-base !text-light-slate-12" level={5}>
                Current Interests
              </Title>
              <LanguagePill topic="javascript" />
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default ContributorProfileInfo;
