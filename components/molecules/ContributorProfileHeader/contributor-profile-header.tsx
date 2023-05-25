import { useRouter } from "next/router";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Avatar from "components/atoms/Avatar/avatar";
import Image from "next/image";
import RainbowBg from "img/rainbow-cover.png";
import Button from "components/atoms/Button/button";
import Link from "next/link";

import { User } from "@supabase/supabase-js";
import { FiCopy } from "react-icons/fi";
import { useToast } from "lib/hooks/useToast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Dialog/dialog";

import { Textarea } from "components/atoms/Textarea/text-area";
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
  handleSignIn: Function;
  isOwner: boolean;
  isRecievingCollaborations?: boolean;
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
}: ContributorProfileHeaderProps) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { requestCollaboration } = useUserCollaborations();
  const [row, setRow] = useState(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  let rowLomit = 6;
  let messageLastScrollHeight = textAreaRef.current ? textAreaRef.current?.scrollHeight : 50;
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
      setLoading(false);
      setMessage("");
    }
  };

  const handleTextAreaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (row < rowLomit && textAreaRef.current && textAreaRef.current?.scrollHeight > messageLastScrollHeight) {
      setRow((prev) => prev + 1);
    } else if (row > 1 && textAreaRef.current && textAreaRef.current?.scrollHeight < messageLastScrollHeight) {
      setRow((prev) => prev--);
    }
    if (!message) setRow(1);
    messageLastScrollHeight = textAreaRef.current?.scrollHeight || 80;
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
            <Button
              onClick={() => handleCopyToClipboard(`${host}/user/${user?.user_metadata.user_name}`)}
              className="px-10 py-2 mb-10 bg-white md:mb-6 "
              variant="text"
            >
              <FiCopy className="mt-1 mr-1" /> Share
            </Button>

            {user ? (
              !isOwner && (
                <>
                  <Button onClick={handleFollowClick} className="px-10 py-2 mb-10 bg-white md:mb-6" variant="text">
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  {isRecievingCollaborations && (
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="px-10 py-2 mb-10 bg-white md:mb-6 "
                      variant="primary"
                    >
                      Collaborate
                    </Button>
                  )}
                </>
              )
            ) : (
              <>
                <Button
                  onClick={async () => await handleSignIn({ provider: "github" })}
                  className="px-10 py-2 mb-10 bg-white md:mb-6 "
                  variant="text"
                >
                  Follow
                </Button>
                {isRecievingCollaborations && (
                  <Button
                    onClick={async () => await handleSignIn({ provider: "github" })}
                    className="px-10 py-2 mb-10 bg-white md:mb-6 "
                    variant="primary"
                  >
                    Collaborate
                  </Button>
                )}
              </>
            )}

            <Link href="#">
              <Button className="hidden px-8 py-2" variant="primary">
                Collaborate
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="px-4 py-8 md:w-3/6 md:space-y-4">
          <DialogHeader>
            <DialogTitle className="!text-3xl text-left">Collaborate with {username}!</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCollaborationRequest} className="flex flex-col gap-4 px-4 md:gap-8 md:px-14 ">
            <div className="space-y-2">
              <label htmlFor="message">Send a message</label>
              <Textarea
                rows={row}
                ref={textAreaRef}
                value={message}
                className="px-2 mb-2 transition text-light-slate-11 focus:outline-none"
                name="message"
                id="message"
                onChange={handleTextAreaInputChange}
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
