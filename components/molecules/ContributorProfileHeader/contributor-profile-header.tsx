import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiCopy } from "react-icons/fi";
import { SignInWithOAuthCredentials, User } from "@supabase/supabase-js";

import Avatar from "components/atoms/Avatar/avatar";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Dialog/dialog";
import { Textarea } from "components/atoms/Textarea/text-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

import { useToast } from "lib/hooks/useToast";
import { useUserCollaborations } from "lib/hooks/useUserCollaborations";

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
  isRecievingCollaborations?: boolean;
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
  isRecievingCollaborations,
  isPremium,
}: ContributorProfileHeaderProps) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { requestCollaboration } = useUserCollaborations();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [host, setHost] = useState("");

  const handleFollowClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleCollaborationRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message && username) {
      setLoading(true);
      await requestCollaboration({ username, message });
      setIsDialogOpen(false);
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
      setLoading(false);
      setMessage("");
    }
  };

  const handleTextAreaInputChange = (e: string) => {
    setMessage(e);
  };

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
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
        <div className="translate-y-[110px] md:hidden ">
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
          <div className="flex flex-col items-center gap-3 translate-y-24 md:translate-y-0 md:flex-row">
            {/* Mobile dropdown menu */}

            <DropdownMenu>
              <div className="flex items-center gap-2 mb-10 md:gap-6">
                <Button
                  onClick={() => handleCopyToClipboard(`${host}/user/${user?.user_metadata.user_name}`)}
                  className="px-8 py-2 bg-white "
                  variant="text"
                >
                  <FiCopy className="mt-1 mr-1" /> Share
                </Button>
                {!isOwner && (
                  <DropdownMenuTrigger title="More options" className="p-2 mr-3 bg-white rounded-full cursor-pointer ">
                    <TfiMoreAlt size={20} className="" />
                  </DropdownMenuTrigger>
                )}
              </div>

              <DropdownMenuContent align="end" className="flex flex-col gap-1 py-2 rounded-lg">
                {user ? (
                  !isOwner && (
                    <>
                      <DropdownMenuItem className="rounded-md">
                        <button onClick={handleFollowClick} className="flex items-center gap-1 pl-3 pr-7">
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      </DropdownMenuItem>
                      {isPremium && isRecievingCollaborations && (
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
                        Follow
                      </button>
                    </DropdownMenuItem>
                    {isRecievingCollaborations && (
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
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full md:!w-2/3 px-4 py-8 md:space-y-4">
          <DialogHeader>
            <DialogTitle className="!text-3xl text-left">Collaborate with {username}!</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCollaborationRequest} className="flex flex-col w-full gap-4 px-4 md:gap-8 md:px-14 ">
            <div className="space-y-2">
              <label htmlFor="message">Send a message</label>
              <Textarea
                defaultRow={1}
                value={message}
                className="w-full px-2 mb-2 transition text-light-slate-11 focus:outline-none"
                name="message"
                id="message"
                onChangeText={handleTextAreaInputChange}
              />
            </div>

            <Button loading={loading} title="submit" className="self-end w-max" variant="primary">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContributorProfileHeader;
