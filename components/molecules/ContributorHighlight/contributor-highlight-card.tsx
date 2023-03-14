import Title from "components/atoms/Typography/title";
import React, { useState, useEffect } from "react";

import { Textarea } from "components/atoms/Textarea/text-area";
import Button from "components/atoms/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/atoms/Dropdown/dropdown";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiEdit, FiLinkedin, FiTwitter } from "react-icons/fi";
import { BsLink45Deg } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { useSWRConfig } from "swr";

import { ToastTrigger } from "lib/utils/toast-trigger";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogCloseButton
} from "../Dialog/dialog";
import { generateApiPrUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { updateHighlights } from "lib/hooks/updateHighlight";
import { MdError } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../AlertDialog/alert-dialog";
import { deleteHighlight } from "lib/hooks/deleteHighlight";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  prLink: string;
  user: string;
  id: string;
}
const ContributorHighlightCard = ({ title, desc, prLink, user, id }: ContributorHighlightCardProps) => {
  const twitterTweet = `${title || "Open Source Highlight"} - OpenSauced from ${user}`;
  const reportSubject = `Reported Highlight ${user}: ${title}`;
  const { mutate } = useSWRConfig();
  const [highlight, setHighlight] = useState({ title, desc, prLink });
  const [wordCount, setWordCount] = useState(highlight.desc?.length || 0);
  const wordLimit = 500;
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user: loggedInUser } = useSupabaseAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    if (!openEdit) {
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
      console.clear();
    }
  }, [openEdit]);

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    try {
      await navigator.clipboard.writeText(url);
      ToastTrigger({ message: "Copied to clipboard", type: "success" });
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
          { url: highlight.prLink, highlight: highlight.desc || "", title: highlight.title },
          id
        );
        setLoading(false);
        if (res) {
          ToastTrigger({ message: "Highlights Updated Successfully", type: "success" });
          setOpenEdit(false);
        } else {
          setLoading(false);
          setError("An error occurred while updating!!!");
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
      ToastTrigger({ message: "Highlights Updated Successfully", type: "success" });
      setAlertOpen(false);
      setOpenEdit(false);
      setTimeout(() => {
        document.body.setAttribute("style", "pointer-events:auto !important");
      }, 1);
      mutate(`users/${user}/highlights`);
    } else {
      console.log(res);
      setAlertOpen(false);
      ToastTrigger({ message: "An error occured!!!", type: "error" });
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <article className="flex flex-col max-w-[40rem] flex-1 gap-3 lg:gap-6">
      <div>
        <div className="flex justify-between items-center">
          {title && (
            <Title className="!text-sm lg:!text-xl !text-light-slate-12" level={4}>
              {title}
            </Title>
          )}
          <div className="flex ml-auto lg:gap-3 gap-3 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="py-2 px-2 hidden rounded-full data-[state=open]:bg-light-slate-7">
                <HiOutlineEmojiHappy size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-row gap-2 rounded-3xl" side="left">
                <DropdownMenuItem className="rounded-full">👍</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">👎</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">🍕</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">😄</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">❤️</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">🚀</DropdownMenuItem>
                <DropdownMenuItem className="rounded-full">👀</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className=" py-2 px-2 rounded-full data-[state=open]:bg-light-slate-7">
                <TfiMoreAlt size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-lg flex flex-col py-2 gap-1">
                <DropdownMenuItem className="rounded-md">
                  <a
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
                  onClick={() => handleCopyToClipboard(`${host}/feed/${id}`)}
                  className="rounded-md"
                >
                  <div className="flex gap-2.5 py-1 items-center pl-3 pr-7">
                    <BsLink45Deg size={22} />
                    <span>Copy link</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md hidden">
                  <div className="flex gap-2.5 py-1  items-center pl-3 pr-7">
                    <FaUserPlus size={22} />
                    <span>Follow user</span>
                  </div>
                </DropdownMenuItem>
                {loggedInUser && (
                  <DropdownMenuItem
                    className={`rounded-md ${
                      loggedInUser && loggedInUser.user_metadata.user_name !== user && "hidden"
                    }`}
                  >
                    <button onClick={() => setOpenEdit(true)} className="flex w-full cursor-default gap-2.5 py-1  items-center pl-3 pr-7">
                      <FiEdit size={22} />
                      <span>Edit</span>
                    </button>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className={`rounded-md ${
                    loggedInUser && loggedInUser.user_metadata.user_name === user && "hidden"
                  }`}
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
          <p className="text-light-slate-11 break-words text-sm lg:text-base font-normal">{desc}</p>
        </div>
        {/* Highlight Link section */}

        <div>
          <a href={prLink} className="underline text-sauced-orange cursor-pointer">
            {prLink}
          </a>
        </div>
      </div>

      {/* Generated OG card section */}
      <GhOpenGraphImg githubLink={prLink} />

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Highlight</DialogTitle>
            <DialogDescription className="font-normal">
              Make changes to your highlights here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateHighlight} className="flex flex-1 font-normal flex-col gap-4 ">
            <div className=" p-2 flex  rounded-lg text-sm overflow-hidden flex-col gap-2 ">
              {/* Error container */}
              {errorMsg && (
                <p className="inline-flex w-max items-center px-2 border rounded-md gap-2  mb-4 border-red-500 text-red-500 py-1 bg-red-100">
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
                  className="h-8 px-2 font-normal focus:border focus:outline-none rounded-lg "
                />
              </fieldset>
              <fieldset className="flex flex-col w-full  gap-1">
                <label htmlFor="description">Body</label>
                <div className="bg-white  focus-within:border rounded-lg">
                  <Textarea
                    value={highlight.desc}
                    onChange={(e) => {
                      setHighlight((prev) => ({ ...prev, desc: e.target.value }));
                      setError("");
                      setWordCount(e.target.value.length);
                    }}
                    className="resize-none h-28  px-2  font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg"
                  ></Textarea>
                  <p className="text-xs px-2 text-light-slate-9 flex justify-end gap-1">
                    <span className={`${wordCount > wordLimit && "text-red-600"}`}>
                      {wordCount > wordLimit ? `-${wordCount - wordLimit}` : wordCount}
                    </span>
                        / <span>{wordLimit}</span>
                  </p>
                </div>
              </fieldset>
              <fieldset className="flex  flex-col w-full gap-1">
                <label htmlFor="title">Pull request link</label>
                <input
                  onChange={(e) => {
                    setHighlight((prev) => ({ ...prev, prLink: e.target.value }));
                    setError("");
                  }}
                  value={highlight.prLink}
                  name="title"
                  className="h-8 px-2 font-normal text-orange-600 focus:outline-none focus:border rounded-lg "
                />
              </fieldset>
            </div>
            <div className="flex gap-3">
              {/* Delete alert dialog content */}
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild className="ml-auto">
                  <Button
                    className=" bg-light-red-7 text-red-600 border border-light-red-400 hover:bg-light-red-8 hover:text-red-700 "
                    variant="primary"
                  >
                    Delete Page
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your Highlight and remove related data from
                      our database.
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
                          className=" bg-red-300 text-red-600 border border-red-400 hover:bg-light-red-8 hover:text-red-700 "
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
