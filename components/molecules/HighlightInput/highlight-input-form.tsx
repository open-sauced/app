import { useEffect, useRef, useState } from "react";

import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";

import { HiOutlineSparkles } from "react-icons/hi";
import { RxPencil1 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { BsTagFill } from "react-icons/bs";
import { useDebounce } from "rooks";
import Button from "components/atoms/Button/button";
import Tooltip from "components/atoms/Tooltip/tooltip";

import { createHighlights } from "lib/hooks/createHighlights";
import {
  generateApiPrUrl,
  getGithubIssueDetails,
  getGithubIssueComments,
  getPullRequestCommitMessageFromUrl,
  isValidIssueUrl,
  isValidPullRequestUrl,
  isValidBlogUrl,
  getAvatarByUsername,
} from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { useToast } from "lib/hooks/useToast";
import TextInput from "components/atoms/TextInput/text-input";
import { generatePrHighlightSummaryByCommitMsg } from "lib/utils/generate-pr-highlight-summary";
import Fab from "components/atoms/Fab/fab";
import { TypeWriterTextArea } from "components/atoms/TypeWriterTextArea/type-writer-text-area";
import { fetchGithubIssueInfo } from "lib/hooks/fetchGithubIssueInfo";
import generateIssueHighlightSummary from "lib/utils/generate-issue-highlight-summary";
import { fetchDevToBlogInfo } from "lib/hooks/fetchDevToBlogInfo";
import { getBlogDetails } from "lib/utils/dev-to";
import generateBlogHighlightSummary from "lib/utils/generate-blog-highlight-summary";
import Search from "components/atoms/Search/search";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { Calendar } from "../Calendar/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Collapsible/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";
import DevToSocialImg from "../DevToSocialImage/dev-to-social-img";
import CardRepoList, { RepoList } from "../CardRepoList/card-repo-list";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog/dialog";

interface HighlightInputFormProps {
  refreshCallback?: Function;
}

const HighlightInputForm = ({ refreshCallback }: HighlightInputFormProps): JSX.Element => {
  const { sessionToken, providerToken } = useSupabaseAuth();
  const [isDivFocused, setIsDivFocused] = useState(false);
  const [isSummaryButtonDisabled, setIsSummaryButtonDisabled] = useState(false);
  const [isFormOpenMobile, setIsFormOpenMobile] = useState(false);
  const [addTaggedRepoFormOpen, setAddTaggedRepoFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [bodyText, setBodyText] = useState("");
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [highlightLink, setHighlightLink] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [taggedRepoList, setTaggedRepoList] = useState<RepoList[]>([]);
  const [taggedRepoSearchTerm, setTaggedRepoSearchTerm] = useState<string>("");
  const [repoTagSuggestions, setRepoTagSuggestions] = useState<string[]>([]);
  const [tagRepoSearchLoading, setTagRepoSearchLoading] = useState<boolean>(false);

  const charLimit = 500;

  const [date, setDate] = useState<Date | undefined>();

  const { toast } = useToast();

  const validCharLimit = () => {
    return charCount - highlightLink.length <= charLimit;
  };

  const handleTextAreaInputChange = (value: string) => {
    setBodyText(value);
  };

  useEffect(() => {
    // disable scroll when form is open
    if (isFormOpenMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFormOpenMobile]);

  // when user updates the highlight link, check if its a github link
  // if its a github link, automatically tag the repo if its not already tagged
  useEffect(() => {
    if (highlightLink && (isValidPullRequestUrl(highlightLink) || isValidIssueUrl(highlightLink))) {
      const { apiPaths } = generateApiPrUrl(highlightLink);
      const { repoName, orgName, issueId } = apiPaths;
      const repoIcon = getAvatarByUsername(orgName, 60);
      if (taggedRepoList.some((repo) => repo.repoName === repoName)) return;
      const newRepo = { repoName, repoOwner: orgName, repoIcon } as RepoList;
      const newTaggedRepoList = [...taggedRepoList, newRepo];
      setTaggedRepoList(newTaggedRepoList);
    }
  }, [highlightLink]);

  const handleTaggedRepoAdd = async (repoFullName: string) => {
    // fetch github api to check if the repo exists
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
      toast({ description: "Repo not found!", title: "Error", variant: "danger" });
      return;
    }

    const [ownerName, repoName] = repoFullName.split("/");
    const repoIcon = getAvatarByUsername(ownerName, 60);
    const newTaggedRepoList = [...taggedRepoList, { repoName, repoOwner: ownerName, repoIcon }];
    setTaggedRepoList(newTaggedRepoList);
    toast({ description: "Repo tag added!", title: "Success", variant: "success" });
  };

  const handleTaggedRepoDelete = (repoName: string) => {
    const newTaggedRepoList = taggedRepoList.filter((repo) => repo.repoName !== repoName);
    setTaggedRepoList(newTaggedRepoList);
  };

  const handleGenerateHighlightSummary = async () => {
    if (
      !highlightLink ||
      (!isValidPullRequestUrl(highlightLink) && !isValidIssueUrl(highlightLink) && !isValidBlogUrl(highlightLink))
    ) {
      toast({
        description: "Please provide a valid pull request, issue or dev.to blog link!",
        title: "Error",
        variant: "danger",
      });
      return;
    }

    setIsSummaryButtonDisabled(true);

    let summary: string | null;
    if (isValidPullRequestUrl(highlightLink)) {
      const commitMessages = await getPullRequestCommitMessageFromUrl(highlightLink);
      summary = await generatePrHighlightSummaryByCommitMsg(commitMessages);
    } else if (isValidIssueUrl(highlightLink)) {
      const { title: issueTitle, body: issueBody } = await getGithubIssueDetails(highlightLink);
      const issueComments = await getGithubIssueComments(highlightLink);
      summary = await generateIssueHighlightSummary(issueTitle, issueBody, issueComments);
    } else {
      const { title: blogTitle, markdown: blogMarkdown } = await getBlogDetails(highlightLink);
      summary = await generateBlogHighlightSummary(blogTitle, blogMarkdown);
    }

    setIsSummaryButtonDisabled(false);

    if (summary) {
      setBodyText(summary);

      setIsTyping(true);

      // Set timeout to stop typing animation
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      setCharCount(summary.length);
    } else {
      toast({ description: "An error occured!", title: "Error", variant: "danger" });
    }
  };

  // Handle submit highlights
  const handlePostHighlight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const highlight = bodyText;

    if (isValidPullRequestUrl(highlightLink) || isValidIssueUrl(highlightLink) || isValidBlogUrl(highlightLink)) {
      // generateApiPrUrl will return an object with repoName, orgName and issueId
      // it can work with both issue and pull request links
      const highlightType = isValidIssueUrl(highlightLink)
        ? "issue"
        : isValidPullRequestUrl(highlightLink)
        ? "pull_request"
        : "blog_post";
      let res: any = {};
      if (highlightType === "pull_request" || highlightType === "issue") {
        const { apiPaths } = generateApiPrUrl(highlightLink);
        const { repoName, orgName, issueId } = apiPaths;
        setLoading(true);
        // Api validation to check validity of github pull request link match
        res =
          highlightType === "issue"
            ? await fetchGithubIssueInfo(orgName, repoName, issueId)
            : await fetchGithubPRInfo(orgName, repoName, issueId);
      } else {
        res = await fetchDevToBlogInfo(highlightLink);
      }

      const taggedRepoFullNames = taggedRepoList.map((repo) => `${repo.repoOwner}/${repo.repoName}`);

      if (res.isError) {
        setLoading(false);

        toast({ description: "A valid Pull request, Issue or dev.to Blog Link is required", variant: "danger" });
        return;
      } else {
        setLoading(true);
        const res = await createHighlights({
          highlight,
          title,
          url: highlightLink,
          shipped_at: date,
          type: highlightType,
          taggedRepos: taggedRepoFullNames,
        });

        setLoading(false);

        if (typeof res === "string") {
          return toast({ description: res, title: "Error", variant: "danger" });
        }

        refreshCallback && refreshCallback();
        setBodyText("");
        setHighlightLink("");
        setTitle("");
        setDate(undefined);
        setIsDivFocused(false);
        setIsFormOpenMobile(false);
        toast({ description: "Highlight Posted!", title: "Success", variant: "success" });
      }
    } else {
      toast({
        description: "Please provide a valid pull request, issue or dev.to blog link!",
        title: "Error",
        variant: "danger",
      });
    }
  };

  // Handle collapsible change
  const handleCollapsibleOpenChange = () => {
    if (isDivFocused && !charCount && !highlightLink) {
      setIsDivFocused(false);
    } else {
      setIsDivFocused(true);
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

  return (
    <form onSubmit={handlePostHighlight} className="flex flex-col flex-1 gap-4 ">
      <Collapsible className="max-sm:hidden" onOpenChange={handleCollapsibleOpenChange} open={isDivFocused}>
        <div className="flex flex-col gap-2 p-2 overflow-hidden text-sm bg-white border rounded-lg">
          <CollapsibleTrigger asChild>
            <div className="flex pr-2">
              <input
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 font-normal placeholder:text-sm focus:outline-none"
                type="text"
                placeholder={isDivFocused ? "Add title (optional)" : "Post a highlight to show your work!"}
                id="highlight-create-input"
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <TypeWriterTextArea
              className={`resize-y min-h-[80px] max-h-99 font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg ${
                !isDivFocused ? "hidden" : ""
              }`}
              defaultRow={4}
              value={bodyText}
              placeholder={` Tell us about your highlight and add a link
              `}
              typewrite={isTyping}
              textContent={bodyText}
              onChangeText={(value) => {
                handleTextAreaInputChange(value);
                setCharCount(value.length);
              }}
              ref={textAreaRef}
            />

            <p className="flex justify-end gap-1 pb-2 text-xs text-light-slate-9">
              <span className={`${!validCharLimit() && "text-red-600"}`}>
                {!validCharLimit() ? `-${charCount - charLimit}` : charCount}
              </span>
              / <span>{charLimit}</span>
            </p>

            <div
              className={`flex items-center justify-between w-full gap-1 p-1 text-sm bg-white border rounded-lg mb-4`}
            >
              <div className="flex w-full gap-1">
                <CardRepoList
                  repoList={taggedRepoList}
                  deletable={true}
                  onDelete={(repoName) => handleTaggedRepoDelete(repoName)}
                />
                <Tooltip content={"Add a repo"}>
                  <button
                    className="flex gap-1  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12 items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setAddTaggedRepoFormOpen(true);
                    }}
                  >
                    <BsTagFill className="rounded-[4px] overflow-hidden" />
                    <span className={"max-w-[45px] md:max-w-[100px] truncate"}>Add a repo</span>
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-full gap-1">
                <Tooltip direction="top" content="Pick a date">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-2 p-2 text-base rounded-full text-light-slate-9 bg-light-slate-3">
                        <FiCalendar className="text-light-slate-11" />
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
                <Tooltip className="text-xs" direction="top" content="Auto-Summarize">
                  <button
                    disabled={isSummaryButtonDisabled}
                    type="button"
                    onClick={handleGenerateHighlightSummary}
                    className="p-2 rounded-full bg-light-slate-3 text-light-slate-11 disabled:cursor-not-allowed disabled:animate-pulse disabled:text-light-orange-9"
                  >
                    <HiOutlineSparkles className="text-base" />
                  </button>
                </Tooltip>
                <TextInput
                  className="text-xs"
                  value={highlightLink}
                  handleChange={(value) => setHighlightLink(value)}
                  placeholder="Paste the URL to your Pull Request or Issue."
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {highlightLink && isDivFocused && highlightLink.includes("github") && (
        <GhOpenGraphImg className="max-sm:hidden" githubLink={highlightLink} />
      )}
      {highlightLink && isDivFocused && highlightLink.includes("dev.to") && (
        <DevToSocialImg className="max-sm:hidden" blogLink={highlightLink} />
      )}

      {isDivFocused && (
        <Button
          loading={loading}
          disabled={!bodyText || !validCharLimit()}
          className="ml-auto max-sm:hidden "
          variant="primary"
        >
          Post
        </Button>
      )}

      {/* Add Repo Popup Form */}

      <Dialog open={addTaggedRepoFormOpen} onOpenChange={setAddTaggedRepoFormOpen}>
        <DialogContent
          style={{
            width: "33vw",
          }}
        >
          <DialogHeader>
            <DialogTitle>Add a repo</DialogTitle>
            <DialogDescription>Add a Repository to tag with this highlight.</DialogDescription>
          </DialogHeader>
          <Search
            isLoading={tagRepoSearchLoading}
            placeholder="Repository Full Name (ex: open-sauced/open-sauced)"
            className="!w-full text-md text-gra"
            name={"query"}
            suggestions={repoTagSuggestions}
            onChange={(value) => setTaggedRepoSearchTerm(value)}
            onSearch={(search) => setTaggedRepoSearchTerm(search as string)}
          />
          <DialogCloseButton onClick={() => setAddTaggedRepoFormOpen(false)} />
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
        </DialogContent>
      </Dialog>
      {/* Mobile popup form */}

      {isFormOpenMobile && (
        <div className="fixed left-0 right-0 z-30 h-screen py-4 transition bg-white top-24 md:hidden">
          <div className="flex items-center justify-between w-full px-2">
            <button onClick={() => setIsFormOpenMobile(false)} type="button">
              <IoClose className="text-2xl text-light-slate-10" />
            </button>
            <Button loading={loading} disabled={!bodyText || !validCharLimit()} className="py-0.5 " variant="primary">
              Post
            </Button>
          </div>
          <div className="flex flex-col gap-2 p-2 overflow-hidden text-sm bg-white ">
            <div className="flex pr-2">
              <input
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 focus:outline-none"
                type="text"
                placeholder={"Add title (optional)"}
                id="highlight-create-input"
              />
            </div>
            <TypeWriterTextArea
              className="resize-y min-h-[80px] max-h-99 font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg "
              defaultRow={4}
              value={bodyText}
              placeholder={` Tell us about your highlight and add a link
            `}
              typewrite={isTyping}
              textContent={bodyText}
              onChangeText={(value) => {
                handleTextAreaInputChange(value);
                setCharCount(value.length);
              }}
              ref={textAreaRef}
            />
            <div className="flex items-center justify-between w-full">
              {date && <span className="text-xs text-light-slate-9">{format(date, "PPP")}</span>}
              <p className="flex justify-end gap-1 pb-2 ml-auto text-xs text-light-slate-9">
                <span className={`${!validCharLimit() && "text-red-600"}`}>
                  {!validCharLimit() ? `-${charCount - charLimit}` : charCount}
                </span>
                / <span>{charLimit}</span>
              </p>
            </div>

            <div className="flex">
              <div className="flex w-full gap-1">
                <Tooltip direction="top" content="Pick a date">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-2 p-2 text-base rounded-full text-light-slate-9 bg-light-slate-3">
                        <FiCalendar className="text-light-slate-11" />
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
                <Tooltip className="text-xs" direction="top" content="Auto-Summarize">
                  <button
                    disabled={isSummaryButtonDisabled}
                    type="button"
                    onClick={handleGenerateHighlightSummary}
                    className="p-2 rounded-full bg-light-slate-3 text-light-slate-11 disabled:cursor-not-allowed disabled:animate-pulse disabled:text-light-orange-9"
                  >
                    <HiOutlineSparkles className="text-base" />
                  </button>
                </Tooltip>
                <TextInput
                  className="text-xs"
                  value={highlightLink}
                  handleChange={(value) => setHighlightLink(value)}
                  placeholder="Paste your PR URL and get it auto-summarized!"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Fab className="md:hidden">
        <div
          onClick={() => setIsFormOpenMobile(true)}
          className="p-3 text-white rounded-full shadow-lg bg-light-orange-10"
          id="mobile-highlight-create-button"
        >
          <RxPencil1 className="text-3xl" />
        </div>
      </Fab>
    </form>
  );
};

export default HighlightInputForm;
