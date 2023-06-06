import React, { useState, useEffect } from "react";
import Avatar from "components/atoms/Avatar/avatar";
import Image from "next/image";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Link from "next/link";
import { MarkGithubIcon } from "@primer/octicons-react";
import { User } from "@supabase/supabase-js";
import { FiCopy } from "react-icons/fi";
import { useToast } from "lib/hooks/useToast";
import { usePostHogContext } from "posthog-js/react";

interface ContributorProfileHeaderProps {
  avatarUrl?: string;
  githubName: string;
  isConnected: boolean;
  isFollowing: boolean;
  handleFollow: Function;
  handleUnfollow: Function;
  user: User | null;
  username: string | undefined;
  handleSignIn: Function;
  isOwner: boolean;
}
const ContributorProfileHeader = ({
  avatarUrl,
  githubName,
  isConnected,
  isFollowing,
  handleFollow,
  handleUnfollow,
  username,
  user,
  handleSignIn,
  isOwner
}: ContributorProfileHeaderProps) => {
  const posthog = usePostHogContext();
  const { toast } = useToast();
  const [host, setHost] = useState("");
  const handleFollowClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    posthog.capture(
      "clicked: profile copied",
      {
        profile: user?.user_metadata.user_name,
      });

    try {
      await navigator.clipboard.writeText(url);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, [user]);

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
            <Button onClick={() => handleCopyToClipboard(`${host}/user/${user?.user_metadata.user_name}`)} className="px-10 py-2 mb-10 bg-white md:mb-6 " variant="text">
              <FiCopy className="mr-1 mt-1" /> Share
            </Button>
            {user ? (
              !isOwner && (
                <Button onClick={handleFollowClick} className="px-10 py-2 mb-10 bg-white md:mb-6 " variant="text">
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )
            ) : (
              <Button
                onClick={async () => await handleSignIn({ provider: "github" })}
                className="px-10 py-2 mb-10 bg-white md:mb-6 "
                variant="text"
              >
                Follow
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
