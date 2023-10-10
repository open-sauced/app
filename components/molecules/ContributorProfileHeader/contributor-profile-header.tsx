import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { clsx } from "clsx";
import { usePostHog } from "posthog-js/react";

import { TfiMoreAlt } from "react-icons/tfi";
import { HiUserAdd } from "react-icons/hi";
import { SignInWithOAuthCredentials, User } from "@supabase/supabase-js";

import Link from "next/link";
import PizzaGradient from "img/icons/pizza-gradient.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import Avatar from "components/atoms/Avatar/avatar";
import Tooltip from "components/atoms/Tooltip/tooltip";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import { Textarea } from "components/atoms/Textarea/text-area";
import { useUserConnections } from "lib/hooks/useUserConnections";
import { useToast } from "lib/hooks/useToast";
import { cardPageUrl } from "lib/utils/urls";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Dialog/dialog";

interface ContributorProfileHeaderProps {
  avatarUrl?: string;
  githubName: string;
  isConnected: boolean;
  isFollowing: boolean;
  handleFollow: Function;
  handleUnfollow: Function;
  user: User | null;
  username: string | undefined;
  handleSignIn: (params: SignInWithOAuthCredentials) => void;
  isOwner: boolean;
  isRecievingConnections?: boolean;
  isPremium?: boolean;
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
  isOwner,
  isRecievingConnections,
  isPremium,
}: ContributorProfileHeaderProps) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { requestConnection } = useUserConnections();
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isCheckingCharLimit, setIsCheckingCharLimit] = useState<boolean>(false);

  const posthog = usePostHog();

  const { toast } = useToast();
  const [host, setHost] = useState("");

  const charLimit = { min: 20, max: 500 };

  const isValidCharLimit = () => {
    return charCount >= charLimit.min && charCount <= charLimit.max;
  };

  const handleFollowClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleConnectionRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message && username) {
      setLoading(true);
      await requestConnection({ username, message });
      setIsDialogOpen(false);
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
      setLoading(false);
      setMessage("");
    }
  };

  const handleTextAreaInputChange = (value: string) => {
    setMessage(value);
    setCharCount(value.length);
    isCheckingCharLimit && setIsCheckingCharLimit(false);
  };

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    posthog!.capture("clicked: profile copied", {
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

      <div className="container flex flex-row items-end justify-between gap-2 px-2 py-6 mx-auto md:px-16">
        <div className="translate-y-[65px] hidden md:inline-flex relative">
          <Avatar
            initialsClassName="text-[100px] -translate-y-2.5  leading-none"
            initials={githubName?.charAt(0)}
            className=""
            hasBorder
            avatarURL={isConnected ? avatarUrl : ""}
            size={184}
            isCircle
          />

          <Tooltip content="Get dev card">
            <Link
              href={cardPageUrl(username!)}
              className="absolute bottom-0 z-10 grid w-12 h-12 rounded-full shadow-md place-content-center border-conic-gradient right-4"
            >
              <div className="grid overflow-hidden rounded-full w-11 h-11 place-content-center bg-black/80">
                <Image priority alt="user profile cover image" className="w-6 h-[1.7rem] " src={PizzaGradient} />
              </div>
            </Link>
          </Tooltip>
        </div>
        <div className="translate-y-[110px] md:hidden relative">
          <Avatar
            initialsClassName="text-[70px] -translate-y-1 leading-none"
            initials={githubName?.charAt(0)}
            className=""
            hasBorder
            avatarURL={isConnected ? avatarUrl : ""}
            size={120}
            isCircle
          />
          <Link
            href={cardPageUrl(username!)}
            className="absolute bottom-0 z-10 grid rounded-full shadow-md w-11 h-11 right-1 place-content-center border-conic-gradient"
          >
            <div className="grid w-[2.5em] h-[2.5em] overflow-hidden rounded-full place-content-center bg-black/80">
              <Image priority alt="user profile cover image" className="w-5 h-5 " src={PizzaGradient} />
            </div>
          </Link>
        </div>
        {isConnected && (
          <div className="flex flex-col items-center gap-3 translate-y-24 md:translate-y-0 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:gap-6">
              {user ? (
                !isOwner && (
                  <>
                    {isFollowing ? (
                      <Button
                        onClick={handleFollowClick}
                        variant="primary"
                        className="group w-[6.25rem] justify-center items-center"
                      >
                        <span className="hidden text-center sm:block group-hover:hidden">Following</span>
                        <span className="block text-center sm:hidden group-hover:block">Unfollow</span>
                      </Button>
                    ) : (
                      <Button variant="primary" className="w-[6.25rem] text-center" onClick={handleFollowClick}>
                        <HiUserAdd fontSize={20} className="mr-1" /> Follow
                      </Button>
                    )}
                  </>
                )
              ) : (
                <>
                  <Button
                    className="sm:hidden"
                    variant="primary"
                    onClick={async () =>
                      handleSignIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
                    }
                  >
                    <HiUserAdd />
                  </Button>
                  <Button
                    className="w-[6.25rem] hidden sm:inline-flex"
                    variant="primary"
                    onClick={async () =>
                      handleSignIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
                    }
                  >
                    <HiUserAdd fontSize={20} className="mr-1" /> Follow
                  </Button>
                </>
              )}

              <DropdownMenu modal={false}>
                <div className="flex-wrap items-center gap-2 md:gap-6">
                  {!isOwner && (
                    <DropdownMenuTrigger
                      title="More options"
                      className="p-2 mr-3 bg-white rounded-full cursor-pointer "
                    >
                      <TfiMoreAlt size={20} className="" />
                    </DropdownMenuTrigger>
                  )}
                </div>

                <DropdownMenuContent align="end" className="flex flex-col gap-1 py-2 rounded-lg">
                  {user ? (
                    !isOwner && (
                      <>
                        <DropdownMenuItem className="rounded-md">
                          <button
                            onClick={() => handleCopyToClipboard(`${host}/user/${user?.user_metadata.user_name}`)}
                            className="flex items-center gap-1 pl-3 pr-7"
                          >
                            Share
                          </button>
                        </DropdownMenuItem>

                        {isPremium && isRecievingConnections && (
                          <DropdownMenuItem className="rounded-md">
                            <button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-1 pl-3 pr-7">
                              Collaborate
                            </button>
                          </DropdownMenuItem>
                        )}
                      </>
                    )
                  ) : (
                    <>
                      <DropdownMenuItem className="rounded-md">
                        <button
                          onClick={async () =>
                            handleSignIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
                          }
                          className="flex items-center gap-1 pl-3 pr-7"
                        >
                          Share
                        </button>
                      </DropdownMenuItem>
                      {isRecievingConnections && (
                        <DropdownMenuItem className="rounded-md">
                          <button
                            onClick={async () =>
                              handleSignIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } })
                            }
                            className="flex items-center gap-1 pl-3 pr-7"
                          >
                            Collaborate
                          </button>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile dropdown menu */}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full md:!w-2/3 px-4 py-8 md:space-y-4">
          <DialogHeader>
            <DialogTitle className="!text-3xl text-left">Collaborate with {username}!</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleConnectionRequest} className="flex flex-col w-full gap-2 px-4 md:gap-8 md:px-14 ">
            <div className="space-y-2">
              <label htmlFor="message">Send a message</label>
              <Textarea
                defaultRow={1}
                value={message}
                className={clsx(
                  "w-full px-2 mb-2 transition text-light-slate-11 focus:outline-none border",
                  isCheckingCharLimit && !isValidCharLimit() && "border-red-500"
                )}
                name="message"
                id="message"
                onChangeText={handleTextAreaInputChange}
                onBlur={() => setIsCheckingCharLimit(true)}
              />
              <div className="flex items-center justify-between w-full">
                {isCheckingCharLimit && !isValidCharLimit() && (
                  <Text className="select-none !text-xs text-red-500 mr-2">
                    {charCount < charLimit.min && "20 Characters Min."}
                    {charCount > charLimit.max && "500 Characters Max."}
                  </Text>
                )}
                <p className="flex justify-end gap-1 ml-auto text-xs text-light-slate-9">
                  <span className={`${!isValidCharLimit() && "text-red-600"}`}>
                    {!isValidCharLimit() && charCount > charLimit.max ? `-${charCount - charLimit.max}` : charCount}
                  </span>
                  / <span>{charLimit.max}</span>
                </p>
              </div>
            </div>

            <Button
              loading={loading}
              title="submit"
              className="self-end w-max"
              variant="primary"
              disabled={!isValidCharLimit()}
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContributorProfileHeader;
