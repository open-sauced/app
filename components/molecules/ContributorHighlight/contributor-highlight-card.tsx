import React, { useState, useEffect } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiEdit, FiLinkedin } from "react-icons/fi";
import { BsCalendar2Event, BsLink45Deg, BsTagFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { GrFlag } from "react-icons/gr";
import Emoji from "react-emoji-render";
import { usePostHog } from "posthog-js/react";
import { MdError } from "react-icons/md";
import { format } from "date-fns";
import { FaUserPlus } from "react-icons/fa";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";
import clsx from "clsx";
import { useDebounce } from "rooks";

import { Textarea } from "components/atoms/Textarea/text-area";
import Button from "components/atoms/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import {
  generateRepoParts,
  getAvatarByUsername,
  getOwnerAndRepoNameFromUrl,
  isValidIssueUrl,
  isValidPullRequestUrl,
} from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { updateHighlights } from "lib/hooks/updateHighlight";
import { deleteHighlight } from "lib/hooks/deleteHighlight";
import { useToast } from "lib/hooks/useToast";
import useHighlightReactions from "lib/hooks/useHighlightReactions";
import useUserHighlightReactions from "lib/hooks/useUserHighlightReactions";
import Tooltip from "components/atoms/Tooltip/tooltip";
import useFollowUser from "lib/hooks/useFollowUser";
import { fetchGithubIssueInfo } from "lib/hooks/fetchGithubIssueInfo";
import { isValidBlogUrl } from "lib/utils/dev-to";
import { fetchDevToBlogInfo } from "lib/hooks/fetchDevToBlogInfo";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import { shortenUrl } from "lib/utils/shorten-url";
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
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import DevToSocialImg from "../DevToSocialImage/dev-to-social-img";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  highlightLink: string;
  user: string;
  id: string;
  shipped_date: string;
  refreshCallBack?: () => void;
  emojis: DbEmojis[];
  type?: HighlightType;
  taggedRepos: string[];
}
export type HighlightType = "pull_request" | "issue" | "blog_post";

const ContributorHighlightCard = ({
  title,
  desc,
  highlightLink,
  user,
  id,
  refreshCallBack,
  emojis,
  type = "pull_request",
  shipped_date,
  taggedRepos,
}: ContributorHighlightCardProps) => {
  const { toast } = useToast();

  const formattedTaggedRepos = (taggedRepos || []).map((repo) => {
    const [repoOwner, repoName] = repo.split("/");
    const repoIcon = getAvatarByUsername(repoOwner, 60);
    return { repoName, repoOwner, repoIcon };
  });

  const twitterTweet = `${title || "Open Source Highlight"} - OpenSauced from ${user}`;
  const reportSubject = `Reported Highlight ${user}: ${title}`;
  const [highlight, setHighlight] = useState({ title, desc, highlightLink });
  const [wordCount, setWordCount] = useState(highlight.desc?.length || 0);
  const wordLimit = 500;
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: loggedInUser, sessionToken, signIn, providerToken } = useSupabaseAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [taggedRepoList, setTaggedRepoList] = useState<RepoList[]>(formattedTaggedRepos);
  const [taggedRepoSearchTerm, setTaggedRepoSearchTerm] = useState<string>("");
  const [repoTagSuggestions, setRepoTagSuggestions] = useState<string[]>([]);
  const [tagRepoSearchLoading, setTagRepoSearchLoading] = useState<boolean>(false);
  const [addTaggedRepoFormOpen, setAddTaggedRepoFormOpen] = useState(false);
  const [host, setHost] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [emojiDropdownOpen, setEmojiDropdownOpen] = useState(false);
  const { follow, unFollow, isError } = useFollowUser(
    dropdownOpen && loggedInUser?.user_metadata.user_name !== user ? user : ""
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverContentRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date | undefined>(shipped_date ? new Date(shipped_date) : undefined);

  const { data: reactions, mutate } = useHighlightReactions(id);
  const { data: userReaction, deleteReaction, addReaction } = useUserHighlightReactions(sessionToken ? id : "");

  const posthog = usePostHog();

  useEffect(() => {
    if (!openEdit) {
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
    }
  }, [openEdit]);

  // when user updates the highlight link, check if its a github link
  // if its a github link, automatically tag the repo if its not already tagged
  useEffect(() => {
    if (
      highlight.highlightLink &&
      (isValidPullRequestUrl(highlight.highlightLink) || isValidIssueUrl(highlight.highlightLink))
    ) {
      const { apiPaths } = generateRepoParts(highlight.highlightLink);
      const { repoName, orgName, issueId } = apiPaths;
      // default to the GitHub avatar if we can't find the avatar for the organization.
      const repoIcon = getAvatarByUsername(orgName ?? "github", 60);
      if (taggedRepoList.some((repo) => repo.repoName === repoName)) return;
      const newRepo = { repoName, repoOwner: orgName, repoIcon } as RepoList;
      const newTaggedRepoList = [...taggedRepoList, newRepo];
      setTaggedRepoList(newTaggedRepoList);
    }
  }, [highlight.highlightLink]);

  useEffect(() => {
    setDate(shipped_date ? new Date(shipped_date) : undefined);
  }, [shipped_date]);

  const isUserReaction = (id: string) => {
    const matches = sessionToken && userReaction.find((reaction) => reaction.emoji_id === id);
    return !matches ? false : true;
  };

  const handleClickOutsidePopoverContent = (e: MouseEvent) => {
    if (popoverContentRef.current && !popoverContentRef.current.contains(e.target as Node)) {
      setPopoverOpen(false);
    }
  };

  const handleClickOutsideDropdownContent = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // This closes the popover when user clicks outside of it's content
    document.addEventListener("mousedown", handleClickOutsidePopoverContent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopoverContent);
    };
  }, [popoverOpen]);

  useEffect(() => {
    // This closes the popover when user clicks outside of it's content
    document.addEventListener("mousedown", handleClickOutsideDropdownContent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdownContent);
    };
  }, [dropdownOpen]);

  const getEmojiReactors = (reaction_users: string[]) => {
    if (!Array.isArray(reaction_users)) return "";

    if (reaction_users.length > 3) {
      return `${reaction_users.slice(0, 3).join(", ")} and ${reaction_users.length - 3} others`;
    } else if (reaction_users.length == 3) {
      return `${reaction_users.slice(0, 2).join(", ")} and ${reaction_users[2]}`;
    } else if (reaction_users.length == 2) {
      return `${reaction_users[0]} and ${reaction_users[1]}`;
    } else if (reaction_users.length === 1) {
      return `${reaction_users[0]}`;
    }
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
      const shortUrl = await shortenUrl(url);
      await navigator.clipboard.writeText(shortUrl);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleTaggedRepoDelete = (repoName: string) => {
    const newTaggedRepoList = taggedRepoList.filter((repo) => repo.repoName !== repoName);
    setTaggedRepoList(newTaggedRepoList);
  };

  let repos: RepoList[] = [];

  if (!taggedRepos || taggedRepos.length === 0) {
    const { owner: repoOwner, repoName } = getOwnerAndRepoNameFromUrl(highlightLink);
    const repoIcon = getAvatarByUsername(repoOwner, 60);

    repos = [{ repoName, repoOwner, repoIcon }];
  } else {
    repos = taggedRepos.map((repo) => {
      const [repoOwner, repoName] = repo.split("/");
      const repoIcon = getAvatarByUsername(repoOwner, 60);
      return { repoName, repoOwner, repoIcon };
    });
  }

  const getHighlightTypePreset = (type: HighlightType): { text: string; icon?: React.ReactElement } => {
    switch (type) {
      case "pull_request":
        return { text: "Pull request", icon: <BiGitPullRequest className="text-md md:text-lg" /> };
      case "blog_post":
        return {
          text: "Blog post",
          icon: (
            // Used svg as i could not find the exact icon in react-icons
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          ),
        };
      case "issue":
        return { text: "Issue", icon: <VscIssues className="text-lg md:text-xl" /> };

      default:
        return { text: "Pull request", icon: <BiGitPullRequest className="text-lg md:text-xl" /> };
    }
  };

  const { icon, text } = getHighlightTypePreset(type);
  const taggedRepoFullNames = taggedRepoList.map((repo) => `${repo.repoOwner}/${repo.repoName}`);

  const handleUpdateHighlight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const highlightLink = highlight.highlightLink.trim();
    if (wordCount > wordLimit) {
      setError("Character limit exceeded");
      return;
    }

    if (isValidPullRequestUrl(highlightLink) || isValidIssueUrl(highlightLink) || isValidBlogUrl(highlightLink)) {
      const { apiPaths } = generateRepoParts(highlight.highlightLink);
      const { repoName, orgName, issueId } = apiPaths;
      setLoading(true);
      let res: any = {};
      const isIssue = isValidIssueUrl(highlightLink);
      const highlightType = isValidIssueUrl(highlightLink)
        ? "issue"
        : isValidPullRequestUrl(highlightLink)
        ? "pull_request"
        : "blog_post";

      if (highlightType === "issue" || highlightType === "pull_request") {
        res = isIssue
          ? await fetchGithubIssueInfo(orgName, repoName, issueId)
          : await fetchGithubPRInfo(orgName, repoName, issueId);
      } else {
        res = await fetchDevToBlogInfo(highlightLink);
      }

      if (res.isError) {
        setLoading(false);
        setError("A valid Pull request, Issue or dev.to Blog Link is required");
        return;
      } else {
        const res = await updateHighlights(
          {
            url: highlight.highlightLink,
            highlight: highlight.desc || "",
            title: highlight.title,
            shipped_at: date,
            type: highlightType,
            taggedRepos: taggedRepoFullNames || [],
          },
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
      setError("Please provide a valid GitHub issue or pull request url");
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
      // eslint-disable-next-line no-console
      console.error(res);
      setAlertOpen(false);
      toast({ description: "An error occured!", variant: "danger" });
    }
  };

  const handleTaggedRepoAdd = async (repoFullName: string) => {
    if (taggedRepoList.length >= 3) {
      setError("You can only tag up to 3 repos!");
      return;
    }

    if (taggedRepoList.some((repo) => `${repo.repoOwner}/${repo.repoName}` === repoFullName)) {
      setError("Repo already tagged!");
      return;
    }

    // fetch API to check if the repo exists with a fallback to the GitHub API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos/${repoFullName}`);

      if (!response.ok) {
        const req = await fetch(`https://api.github.com/repos/${repoFullName}`, {
          ...(providerToken
            ? {
                headers: {
                  Authorization: `Bearer ${providerToken}`,
                },
              }
            : {}),
        });
        if (!req.ok) {
          setError("Repo does not exist!");
          return;
        }
      }

      const [ownerName, repoName] = repoFullName.split("/");
      const repoIcon = getAvatarByUsername(ownerName, 60);
      const newTaggedRepoList = [...taggedRepoList, { repoName, repoOwner: ownerName, repoIcon }];
      setTaggedRepoList(newTaggedRepoList);
      toast({ description: "Repo tag added!", title: "Success", variant: "success" });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setError("An error occured!");
    }
  };

  const updateSuggestionsDebounced = useDebounce(async () => {
    setTagRepoSearchLoading(true);

    const req = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        `${taggedRepoSearchTerm} in:name in:repo:owner/name sort:updated`
      )}`,
      {
        ...(providerToken
          ? {
              headers: {
                Authorization: `Bearer ${providerToken}`,
              },
            }
          : {}),
      }
    );

    setTagRepoSearchLoading(false);
    if (req.ok) {
      const res = await req.json();
      const suggestions = res.items.map((item: any) => item.full_name);
      setRepoTagSuggestions(suggestions);
    }
  }, 250);

  useEffect(() => {
    setRepoTagSuggestions([]);
    if (!taggedRepoSearchTerm) return;
    updateSuggestionsDebounced();
  }, [taggedRepoSearchTerm]);

  useEffect(() => {
    if (window !== undefined) {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <article className="w-full flex flex-col flex-1 gap-3 md:max-w-[40rem] lg:gap-6 lg:max-w-[29rem] 2xl:max-w-[34rem]">
      <div>
        <div className={clsx("flex items-center mb-4 gap-1 text-light-slate-11", title && "mb-2")}>
          {icon}
          <span className="text-sm text-light-slate-11">{getHighlightTypePreset(type).text}</span>
          <div className="flex items-center gap-3 ml-auto lg:gap-3">
            <DropdownMenu open={dropdownOpen} modal={false}>
              <div className="flex items-center gap-3 w-max">
                <Tooltip direction="top" content="share on twitter">
                  <a
                    onClick={() => {
                      handleCaptureClickDetailsForAnalytics("twitter");
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={`https://twitter.com/intent/tweet?text=${twitterTweet}&url=${host}/feed/${id}`}
                    className="flex items-center p-3 transition rounded-full hover:bg-light-orange-5"
                  >
                    <FaXTwitter className="text-lg text-light-orange-9 md:text-xl" />
                  </a>
                </Tooltip>
                <DropdownMenuTrigger
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="py-2 px-2 rounded-full data-[state=open]:bg-light-slate-7"
                >
                  <TfiMoreAlt className={"fill-light-slate-11"} size={24} />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent ref={dropdownRef} align="end" className="flex flex-col gap-1 py-2 rounded-lg">
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
                <DropdownMenuItem
                  onClick={() => {
                    handleCopyToClipboard(`${host}/feed/${id}`);
                    setDropdownOpen(false);
                  }}
                  className="rounded-md"
                >
                  <div className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer">
                    <BsLink45Deg size={22} />
                    <span>Copy link</span>
                  </div>
                </DropdownMenuItem>
                {loggedInUser ? (
                  <DropdownMenuItem
                    className={`rounded-md ${loggedInUser?.user_metadata?.user_name === user && "hidden"}`}
                  >
                    <div
                      onClick={isError ? follow : unFollow}
                      className="flex gap-2.5 py-1 items-center pl-3 pr-7 cursor-pointer"
                    >
                      <FaUserPlus size={22} />
                      <span>
                        {!isError ? "Unfollow" : "Follow"} {user}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="rounded-md">
                    <div
                      onClick={async () => signIn({ provider: "github" })}
                      className="flex gap-2.5 py-1  items-center pl-3 pr-7"
                    >
                      <FaUserPlus size={22} />
                      <span>Follow {user}</span>
                    </div>
                  </DropdownMenuItem>
                )}
                {loggedInUser && (
                  <DropdownMenuItem
                    className={`rounded-md ${
                      loggedInUser && loggedInUser.user_metadata.user_name !== user && "hidden"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setDropdownOpen(false);
                      }}
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
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-1 pr-2">
            {title && (
              <Title className="!text-sm  break-words lg:!text-xl !text-light-slate-12" level={4}>
                {title}
              </Title>
            )}
          </div>
        </div>

        {/* Highlight body section */}
        <p className="text-sm font-normal break-words text-light-slate-12 lg:text-base">{desc}</p>

        {/* Highlight Link section */}
        <div className="flex">
          <a
            href={highlightLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-block underline truncate cursor-pointer text-sauced-orange"
          >
            {highlightLink}
          </a>
        </div>
      </div>

      {/* Generated OG card section */}
      <a href={highlightLink} target="_blank" rel="noreferrer" aria-hidden="true">
        {type === "pull_request" || type === "issue" ? (
          <GhOpenGraphImg githubLink={highlightLink} />
        ) : (
          <DevToSocialImg blogLink={highlightLink} />
        )}
      </a>

      <div className="flex flex-wrap items-center gap-1">
        <DropdownMenu modal={false} open={emojiDropdownOpen}>
          <DropdownMenuTrigger
            className="p-1 rounded-full data-[state=open]:bg-light-slate-7"
            onClick={() => setEmojiDropdownOpen(!emojiDropdownOpen)}
          >
            <HiOutlineEmojiHappy className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex flex-row gap-1 rounded-3xl"
            side="right"
            onClick={() => setEmojiDropdownOpen(false)}
          >
            {emojis &&
              emojis.length > 0 &&
              emojis.map(({ id, name }) => (
                <DropdownMenuItem
                  onClick={async () => (sessionToken ? handleUpdateReaction(id) : signIn({ provider: "github" }))}
                  key={id}
                  className="rounded-full !px-2 !cursor-pointer text-orange-500"
                >
                  <Emoji text={`:${name}:`} />
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {reactions &&
          emojis &&
          reactions.length > 0 &&
          reactions.map(({ emoji_id, reaction_count, reaction_users }) => (
            <Tooltip
              key={emoji_id}
              direction="top"
              content={`${getEmojiReactors(reaction_users)} reacted with ${getEmojiNameById(emoji_id)} emoji`}
            >
              <button
                className={`px-1 py-0 md:py-0.5 hover:bg-light-slate-6 transition  md:px-1.5 shrink-0 border flex items-center justify-center rounded-full cursor-pointer ${
                  isUserReaction(emoji_id) && "bg-light-slate-6"
                }`}
                onClick={async () => (sessionToken ? handleUpdateReaction(emoji_id) : signIn({ provider: "github" }))}
              >
                <Emoji
                  className="text-xs text-orange-500 md:text-sm"
                  text={`:${getEmojiNameById(emoji_id)}: ${reaction_count}`}
                />
              </button>
            </Tooltip>
          ))}
        <div className="ml-auto">
          <CardRepoList repoList={repos} />
        </div>
      </div>

      {/* Edit highlight dialog */}

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="p-4">
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
                      <Popover open={popoverOpen}>
                        <PopoverTrigger asChild>
                          <button
                            onClick={() => setPopoverOpen(!popoverOpen)}
                            className="flex items-center gap-2 text-base text-light-slate-9"
                          >
                            <BsCalendar2Event className="text-light-slate-9" />
                            {date && <span className="text-xs">{format(date, "PPP")}</span>}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent ref={popoverContentRef} className="w-auto p-0 bg-white pointer-events-auto">
                          <Calendar
                            // block user's from selecting a future date
                            toDate={new Date()}
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              setDate(date);
                              setPopoverOpen(false);
                            }}
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
                <label htmlFor="title">Highlight link</label>
                <input
                  onChange={(e) => {
                    setHighlight((prev) => ({ ...prev, highlightLink: e.target.value }));
                    setError("");
                  }}
                  value={highlight.highlightLink}
                  name="title"
                  className="h-8 px-2 font-normal text-orange-600 rounded-lg focus:outline-none focus:border "
                />
              </fieldset>

              <label htmlFor="title">Tagged Repos</label>
              <div className={`flex items-center justify-between w-full gap-1 p-1 text-sm bg-white  rounded-lg mb-4`}>
                <div className="flex w-full gap-1">
                  <CardRepoList
                    repoList={taggedRepoList}
                    deletable={true}
                    onDelete={(repoName) => handleTaggedRepoDelete(repoName)}
                  />
                  <AlertDialog open={addTaggedRepoFormOpen} onOpenChange={(prev) => !prev}>
                    <AlertDialogTrigger asChild>
                      <Tooltip content={"Add a repo"}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setAddTaggedRepoFormOpen(true);
                          }}
                          className="flex gap-1  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12 items-center cursor-pointer"
                        >
                          <BsTagFill className="rounded-[4px] overflow-hidden" />
                          <span className={"max-w-[45px] md:max-w-[100px] truncate"}>Add a repo</span>
                        </button>
                      </Tooltip>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="z-100">
                      <Search
                        isLoading={tagRepoSearchLoading}
                        placeholder="Repository Full Name (ex: open-sauced/open-sauced)"
                        className="!w-full text-md text-gra"
                        name={"query"}
                        suggestions={repoTagSuggestions}
                        onChange={(value) => setTaggedRepoSearchTerm(value)}
                        onSearch={(search) => setTaggedRepoSearchTerm(search as string)}
                      />

                      <div className="flex justify-end gap-2">
                        <Button variant="default" onClick={() => setAddTaggedRepoFormOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setAddTaggedRepoFormOpen(false);
                            handleTaggedRepoAdd(taggedRepoSearchTerm);
                          }}
                          disabled={!taggedRepoSearchTerm}
                        >
                          Add
                        </Button>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {/* Delete alert dialog content */}
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild className="ml-auto">
                  <Button
                    className="text-red-600 border bg-light-red-7 border-light-red-400 hover:bg-light-red-8 hover:text-red-700"
                    variant="primary"
                  >
                    Delete Highlight
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
              <Button loading={loading} variant="primary">
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
