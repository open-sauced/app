import Title from "components/atoms/Typography/title";
import React, { useState } from "react";

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
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "../Dialog/dialog";
import { generateApiPrUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { updateHighlights } from "lib/hooks/updateHighlight";

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
  const [error, setError] = useState("");
  const { user: loggedInUser } = useSupabaseAuth();

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

    if (isValidGhUrl) {
      const { apiPaths } = generateApiPrUrl(highlight.prLink);
      const { repoName, orgName, issueId } = apiPaths;

      const res = await fetchGithubPRInfo(orgName, repoName, issueId);

      if (res.isError) {
        setError("Please provide a valid github pull url");
        return;
      } else {
        const res = await updateHighlights(
          { url: highlight.prLink, highlight: highlight.desc || "", title: highlight.title },
          id
        );
        if (res) {
          mutate(`users/${user}/highlights`);
        } else {
          setError("An error occurred while updating!!!");
        }
      }
    } else {
      setError("Please provide a valid github pull url");
      console.log("Please provide a valid github pull url");
    }
  };

  return (
    <article className="flex flex-col max-w-[40rem] flex-1 gap-3 lg:gap-6">
      <Dialog
        onOpenChange={(state) => {
          if (!state)
            setTimeout(() => {
              document.body.setAttribute("style", "pointer-events:auto !important");
            });
        }}
      >
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
                    href={`https://twitter.com/intent/tweet?text=${twitterTweet}&url=https://insights.opensauced.pizza/user/${user}`}
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
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://insights.opensauced.pizza/user/${user}`}
                    className="flex gap-2.5 py-1 items-center pl-3 pr-7"
                  >
                    <FiLinkedin size={22} />
                    <span>Share to Linkedin</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleCopyToClipboard(`https://insights.opensauced.pizza/user/${user}`)}
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
                <DropdownMenuItem
                  className={`rounded-md ${loggedInUser && loggedInUser.user_metadata.user_name !== user && "hidden"}`}
                >
                  <DialogTrigger asChild className="w-full">
                    <div className="flex gap-2.5 py-1  items-center pl-3 pr-7">
                      <FiEdit size={22} />
                      <span>Edit</span>
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>

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
        <div>
          <p className="text-light-slate-11 text-sm lg:text-base font-normal">{desc}</p>
        </div>
        {/* Highlight Link section */}

        <div>
          <a href={prLink} className="underline text-sauced-orange cursor-pointer">
            {prLink}
          </a>
        </div>

        {/* This was placed here to prevent the Dropdown Wrapper from hiding it */}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Highlight</DialogTitle>
            <DialogDescription className="font-normal">
              Make changes to your highlights here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateHighlight} className="flex flex-1 font-normal flex-col gap-4 ">
            <div className=" p-2 flex  rounded-lg text-sm overflow-hidden flex-col gap-2 ">
              <p></p>
              <fieldset className="flex flex-col w-full gap-1">
                <label htmlFor="title">title (optional)</label>
                <input
                  onChange={(e) => setHighlight((prev) => ({ ...prev, title: e.target.value }))}
                  value={highlight.title}
                  name="title"
                  className="h-8 px-2 font-normal focus:border focus:outline-none rounded-lg "
                />
              </fieldset>
              <fieldset className="flex flex-col w-full gap-1">
                <label htmlFor="description">body</label>
                <Textarea
                  value={highlight.desc}
                  onChange={(e) => setHighlight((prev) => ({ ...prev, desc: e.target.value }))}
                  className="resize-none bg-white px-2 focus:border font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg"
                ></Textarea>
              </fieldset>
              <fieldset className="flex  flex-col w-full gap-1">
                <label htmlFor="title">Pull request link</label>
                <input
                  onChange={(e) => setHighlight((prev) => ({ ...prev, prLink: e.target.value }))}
                  value={highlight.prLink}
                  name="title"
                  className="h-8 px-2 font-normal text-orange-600 focus:outline-none focus:border rounded-lg "
                />
              </fieldset>
            </div>
            <Button className="ml-auto" variant="primary">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Generated OG card section */}
      <GhOpenGraphImg githubLink={prLink} />
    </article>
  );
};

export default ContributorHighlightCard;
