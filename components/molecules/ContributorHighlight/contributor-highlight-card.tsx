import React, { useState, useEffect } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiEdit, FiLinkedin, FiTwitter } from "react-icons/fi";
import { BsCalendar2Event, BsLink45Deg } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import Emoji from "react-emoji-render";
import { usePostHog } from "posthog-js/react";
import { MdError } from "react-icons/md";
import { format } from "date-fns";
import Title from "components/atoms/Typography/title";

import { Textarea } from "components/atoms/Textarea/text-area";
import Button from "components/atoms/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { generateApiPrUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { updateHighlights } from "lib/hooks/updateHighlight";
import { deleteHighlight } from "lib/hooks/deleteHighlight";
import { useToast } from "lib/hooks/useToast";
import useFollowUser from "lib/hooks/useFollowUser";
import useHighlightReactions from "lib/hooks/useHighlightReactions";
import useUserHighlightReactions from "lib/hooks/useUserHighlightReactions";
import Tooltip from "components/atoms/Tooltip/tooltip";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "../Dialog/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover";
import { Calendar } from "../Calendar/calendar";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  prLink: string;
  user: string;
  id: string;
  shipped_date: string;
  refreshCallBack?: () => void;
  emojis: DbEmojis[];
}

const ContributorHighlightCard = ({
  title,
  desc,
  prLink,
  user,
  id,
  refreshCallBack,
  emojis,
  shipped_date,
}: ContributorHighlightCardProps) => {
  const { toast } = useToast();
  const twitterTweet = `${title || "Open Source Highlight"} - OpenSauced from ${user}`;
  const reportSubject = `Reported Highlight ${user}: ${title}`;
  const [highlight, setHighlight] = useState({ title, desc, prLink });
  const [wordCount, setWordCount] = useState(highlight.desc?.length || 0);
  const wordLimit = 500;
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: loggedInUser, sessionToken, signIn } = useSupabaseAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [host, setHost] = useState("");

  const [date, setDate] = useState<Date | undefined>(shipped_date ? new Date(shipped_date) : undefined);

  const { data: reactions, mutate } = useHighlightReactions(id);
  const { data: userReaction, deleteReaction, addReaction } = useUserHighlightReactions(id);

  const posthog = usePostHog();

  // console.log(shipped_date);
  useEffect(() => {
    if (!openEdit) {
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
    }
  }, [openEdit]);

  useEffect(() => {
    setDate(shipped_date ? new Date(shipped_date) : undefined);
  }, [shipped_date]);

  const isUserReaction = (id: string) => {
    const matches = userReaction.find((reaction) => reaction.emoji_id === id);
    return !matches ? false : true;
  };

  const getEmojiNameById = (id: string) => {
    return emojis && emojis.length > 0 ? emojis.filter((emoji) => emoji.id === id)[0].name : "";
  };

  const handleUpdateReaction = async (id: string) => {
    if (isUserReaction(id)) {
      // making sure the delete is triggered before the data is refetched
      await deleteReaction(id);
      mutate();
    } else {
      await addReaction(id);
      mutate();
    }
  };

  const handleCaptureClickDetailsForAnalytics = (medium: "linkedin" | "twitter" | "link") => {
    let text;
    if (medium === "linkedin") {
      text = "highlight shared to linkedin";
    } else if (medium === "twitter") {
      text = "higlight tweeted";
    } else text = "highlight copied";
    posthog!.capture(`clicked: ${text}`);
  };

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    handleCaptureClickDetailsForAnalytics("link");

    try {
      await navigator.clipboard.writeText(url);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateHighlight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidGhUrl = highlight.prLink.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/);
    if (wordCount > wordLimit) {
      setError("Character limit exceeded");
      return;
    }

    if (isValidGhUrl) {
      const { apiPaths } = generateApiPrUrl(highlight.prLink);
      const { repoName, orgName, issueId } = apiPaths;
      setLoading(true);
      const res = await fetchGithubPRInfo(orgName, repoName, issueId);

      if (res.isError) {
        setLoading(false);
        setError("Please provide a valid github pull request url");
        return;
      } else {
        const res = await updateHighlights(
          { url: highlight.prLink, highlight: highlight.desc || "", title: highlight.title, shipped_at: date },
          id
        );
        setLoading(false);
        if (res) {
          toast({ description: "Highlights Updated Successfully", variant: "success" });
          setDate(undefined);
          refreshCallBack && refreshCallBack();
          setOpenEdit(false);
        } else {
          setLoading(false);
          setError("An error occurred while updating!");
        }
      }
    } else {
      setError("Please provide a valid github pull request url");
    }
  };

  const handleDeleteHighlight = async () => {
    setDeleteLoading(true);
    const res = await deleteHighlight(id);
    setDeleteLoading(false);
    if (res !== false) {
      toast({ description: "Highlights deleted Successfully", variant: "success" });

      refreshCallBack && refreshCallBack();

      setAlertOpen(false);
      setOpenEdit(false);
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
    } else {
      console.error(res);
      setAlertOpen(false);
      toast({ description: "An error occured!", variant: "danger" });
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setHost(window.location.origin as string);
    }
  }, [highlight]);

  function FollowUser() {
    const { follow, unFollow, isError } = useFollowUser(user);

    return loggedInUser ? (
      <DropdownMenuItem className={`rounded-md ${loggedInUser.user_metadata.user_name === user && "hidden"}`}>
        <div onClick={isError ? follow : unFollow} className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
          <FaUserPlus size={22} />
          <span>
            {!isError ? "Unfollow" : "Follow"} {user}
          </span>
        </div>
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem className="rounded-md">
        <div
          onClick={async () => await signIn({ provider: "github" })}
          className="flex gap-2.5 py-1  items-center pl-3 pr-7"
        >
          <FaUserPlus size={22} />
          <span>Follow {user}</span>
        </div>
      </DropdownMenuItem>
    );
  }

  return (
    <article className="flex flex-col  md:max-w-[40rem] flex-1 gap-3 lg:gap-6">
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-1 pr-2">
            {title && (
              <Title className="!text-sm  break-words lg:!text-xl !text-light-slate-12" level={4}>
                {title}
              </Title>
            )}
          </div>
          <div className="flex items-center gap-3 ml-auto lg:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className=" py-2 px-2 rounded-full data-[state=open]:bg-light-slate-7">
                <TfiMoreAlt size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1 py-2 rounded-lg">
                <DropdownMenuItem className="rounded-md">
                  <a
                    onClick={() => {
                      handleCaptureClickDetailsForAnalytics("twitter");
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://twitter.com/intent/tweet?text=${twitterTweet}&url=${host}/feed/${id}`}
                    className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                  >
                    <FiTwitter size={22} />
                    <span>Share to Twitter</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md">
                  <a
                    onClick={() => {
                      handleCaptureClickDetailsForAnalytics("linkedin");
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${host}/feed/${id}`}
                    className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                  >
                    <FiLinkedin size={22} />
                    <span>Share to Linkedin</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyToClipboard(`${host}/feed/${id}`)} className="rounded-md">
                  <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
                    <BsLink45Deg size={22} />
                    <span>Copy link</span>
                  </div>
                </DropdownMenuItem>
                <FollowUser />
                {loggedInUser && (
                  <DropdownMenuItem
                    className={`rounded-md ${
                      loggedInUser && loggedInUser.user_metadata.user_name !== user && "hidden"
                    }`}
                  >
                    <button
                      onClick={() => setOpenEdit(true)}
                      className="flex w-full cursor-default gap-2.5 py-1  items-center pl-3 pr-7"
                    >
                      <FiEdit size={22} />
                      <span>Edit</span>
                    </button>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className={`rounded-md ${loggedInUser && loggedInUser.user_metadata.user_name === user && "hidden"}`}
                >
                  <a
                    href={`mailto:hello@opensauced.pizza?subject=${reportSubject}`}
                    className="flex gap-2.5 py-1  items-center pl-3 pr-7"
                  >
                    <GrFlag size={22} />
                    <span>Report content</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Highlight body section */}
        <div className="w-full ">
          <p className="text-sm font-normal break-words text-light-slate-11 lg:text-base">{desc}</p>
        </div>
        {/* Highlight Link section */}

        <div>
          <a href={prLink} className="underline break-words cursor-pointer text-sauced-orange">
            {prLink}
          </a>
        </div>
      </div>

      {/* Generated OG card section */}
      <GhOpenGraphImg githubLink={prLink} />

      <div className="flex flex-wrap items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1   rounded-full data-[state=open]:bg-light-slate-7">
            <HiOutlineEmojiHappy className="w-5 h-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-row gap-1 rounded-3xl" side="right">
            {emojis &&
              emojis.length > 0 &&
              emojis.map(({ id, name }) => (
                <DropdownMenuItem
                  onClick={async () => (sessionToken ? handleUpdateReaction(id) : await signIn({ provider: "github" }))}
                  key={id}
                  className="rounded-full !px-2 !cursor-pointer"
                >
                  <Emoji text={`:${name}:`} />
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {reactions &&
          emojis &&
          reactions.length > 0 &&
          reactions.map(({ emoji_id, reaction_count }) => (
            <div
              className={`px-1 py-0 md:py-0.5 hover:bg-light-slate-6 transition  md:px-1.5 shrink-0 border flex items-center justify-center rounded-full cursor-pointer ${
                isUserReaction(emoji_id) && "bg-light-slate-6"
              }`}
              onClick={async () =>
                sessionToken ? handleUpdateReaction(emoji_id) : await signIn({ provider: "github" })
              }
              key={emoji_id}
            >
              <Emoji
                className="text-xs md:text-sm text-light-slate-10"
                text={`:${getEmojiNameById(emoji_id)}: ${reaction_count}`}
              />
            </div>
          ))}
      </div>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Highlight</DialogTitle>
            <DialogDescription className="font-normal">
              Make changes to your highlights here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateHighlight} className="flex flex-col flex-1 gap-4 font-normal ">
            <div className="flex flex-col gap-2 p-2 overflow-hidden text-sm rounded-lg ">
              {/* Error container */}
              {errorMsg && (
                <p className="inline-flex items-center gap-2 px-2 py-1 mb-4 text-red-500 bg-red-100 border border-red-500 rounded-md w-max">
                  <MdError size={20} /> {errorMsg}
                </p>
              )}
              <fieldset className="flex flex-col w-full gap-1">
                <label htmlFor="title">Title (optional)</label>
                <input
                  onChange={(e) => {
                    setHighlight((prev) => ({ ...prev, title: e.target.value }));
                    setError("");
                  }}
                  value={highlight.title}
                  name="title"
                  className="h-8 px-2 font-normal rounded-lg focus:border focus:outline-none "
                />
              </fieldset>
              <fieldset className="flex flex-col w-full gap-1">
                <label htmlFor="description">Body</label>
                <div className="bg-white rounded-lg focus-within:border">
                  <Textarea
                    value={highlight.desc}
                    onChange={(e) => {
                      setHighlight((prev) => ({ ...prev, desc: e.target.value }));
                      setError("");
                      setWordCount(e.target.value.length);
                    }}
                    className="px-2 mb-2 font-normal transition rounded-lg resize-y min-h-[90px]  max-h-96 h-28 text-light-slate-11 focus:outline-none"
                  ></Textarea>
                  <div className="flex items-center justify-between py-1 pl-3">
                    <Tooltip direction="top" content="Pick a date">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 text-base text-light-slate-9">
                            <BsCalendar2Event className="text-light-slate-9" />
                            {date && <span className="text-xs">{format(date, "PPP")}</span>}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                          <Calendar
                            // block user's from selecting a future date
                            toDate={new Date()}
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="border rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </Tooltip>
                    <p className="flex justify-end gap-1 px-2 text-xs text-light-slate-9">
                      <span className={`${wordCount > wordLimit && "text-red-600"}`}>
                        {wordCount > wordLimit ? `-${wordCount - wordLimit}` : wordCount}
                      </span>
                      / <span>{wordLimit}</span>
                    </p>
                  </div>
                </div>
              </fieldset>
              <fieldset className="flex flex-col w-full gap-1">
                <label htmlFor="title">Pull request link</label>
                <input
                  onChange={(e) => {
                    setHighlight((prev) => ({ ...prev, prLink: e.target.value }));
                    setError("");
                  }}
                  value={highlight.prLink}
                  name="title"
                  className="h-8 px-2 font-normal text-orange-600 rounded-lg focus:outline-none focus:border "
                />
              </fieldset>
            </div>
            <div className="flex gap-3">
              {/* Delete alert dialog content */}
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild className="ml-auto">
                  <Button
                    className="text-red-600 border bg-light-red-7 border-light-red-400 hover:bg-light-red-8 hover:text-red-700"
                    variant="primary"
                  >
                    Delete Page
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your Highlight and remove related data
                      from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex items-center justify-end gap-3">
                      <AlertDialogAction asChild onClick={() => setAlertOpen(false)}>
                        <Button className="ml-auto" variant="text">
                          Cancel
                        </Button>
                      </AlertDialogAction>
                      <AlertDialogAction asChild>
                        <Button
                          loading={deleteLoading}
                          className="text-red-600 bg-red-300 border border-red-400 hover:bg-light-red-8 hover:text-red-700"
                          variant="text"
                          onClick={() => handleDeleteHighlight()}
                        >
                          Confirm
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button loading={loading} className="" variant="primary">
                Save
              </Button>
            </div>
          </form>
          <DialogCloseButton onClick={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default ContributorHighlightCard;
