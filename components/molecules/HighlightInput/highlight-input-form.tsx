import { useEffect, useRef, useState } from "react";

import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";

import { HiOutlineSparkles } from "react-icons/hi";
import { RxPencil1 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Button from "components/atoms/Button/button";
import { Textarea } from "components/atoms/Textarea/text-area";
import Tooltip from "components/atoms/Tooltip/tooltip";

import { createHighlights } from "lib/hooks/createHighlights";
import { generateApiPrUrl, getPullRequestCommitMessageFromUrl, isValidPullRequestUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { useToast } from "lib/hooks/useToast";
import TextInput from "components/atoms/TextInput/text-input";
import { generatePrHighlightSummaryByCommitMsg } from "lib/utils/generate-pr-highlight-summary";
import Fab from "components/atoms/Fab/fab";
import { Calendar } from "../Calendar/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Collapsible/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";

interface HighlightInputFormProps {
  refreshCallback?: Function;
}

const HighlightInputForm = ({ refreshCallback }: HighlightInputFormProps): JSX.Element => {
  const [isDivFocused, setIsDivFocused] = useState(false);
  const [isFormOpenMobile, setIsFormOpenMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [bodyText, setBodyText] = useState("");
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [pullrequestLink, setPullRequestLink] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const charLimit = 500;

  const [date, setDate] = useState<Date | undefined>();

  const { toast } = useToast();

  const validCharLimit = () => {
    return charCount - pullrequestLink.length <= charLimit;
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

  const handleGenerateHighlightSummary = async () => {
    if (!pullrequestLink || !isValidPullRequestUrl(pullrequestLink)) {
      toast({ description: "Please provide a valid pull request link!", title: "Error", variant: "danger" });
      return;
    }

    const commitMessages = await getPullRequestCommitMessageFromUrl(pullrequestLink);
    const summary = await generatePrHighlightSummaryByCommitMsg(commitMessages);

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

    if (isValidPullRequestUrl(pullrequestLink)) {
      const { apiPaths } = generateApiPrUrl(pullrequestLink);
      const { repoName, orgName, issueId } = apiPaths;
      setLoading(true);
      // Api validation to check validity of github pull request link match
      const res = await fetchGithubPRInfo(orgName, repoName, issueId);

      if (res.isError) {
        setLoading(false);

        toast({ description: "A valid Pull request Link is required", variant: "danger" });
        return;
      } else {
        setLoading(true);
        const res = await createHighlights({
          highlight,
          title,
          url: pullrequestLink,
          shipped_at: date,
        });

        setLoading(false);

        if (typeof res === "string") {
          return toast({ description: res, title: "Error", variant: "danger" });
        }

        refreshCallback && refreshCallback();
        setBodyText("");
        setPullRequestLink("");
        setTitle("");
        setDate(undefined);
        setIsDivFocused(false);
        setIsFormOpenMobile(false);
        toast({ description: "Highlight Posted!", title: "Success", variant: "success" });
      }
    } else {
      toast({ description: "Please provide a valid pull request link!", title: "Error", variant: "danger" });
    }
  };

  // Handle collapsible change
  const handleCollapsibleOpenChange = () => {
    if (isDivFocused && !charCount) {
      setIsDivFocused(false);
    } else {
      setIsDivFocused(true);
    }
  };

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
                className="flex-1 focus:outline-none"
                type="text"
                placeholder={isDivFocused ? "Add title (optional)" : "Post a highlight to show your work!"}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Textarea
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
                    type="button"
                    onClick={handleGenerateHighlightSummary}
                    className="p-2 rounded-full bg-light-slate-3 text-light-slate-11"
                  >
                    <HiOutlineSparkles className="text-base" />
                  </button>
                </Tooltip>
                <TextInput
                  className="text-xs"
                  value={pullrequestLink}
                  handleChange={(value) => setPullRequestLink(value)}
                  placeholder="Paste your PR URL and get it auto-summarized!"
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {pullrequestLink && isDivFocused && <GhOpenGraphImg className="max-sm:hidden" githubLink={pullrequestLink} />}

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

      {/* Mobile popup form */}

      {isFormOpenMobile && (
        <div className="fixed left-0 right-0 z-50 h-screen py-4 transition bg-white top-24 md:hidden">
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
              />
            </div>
            <Textarea
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
                    type="button"
                    onClick={handleGenerateHighlightSummary}
                    className="p-2 rounded-full bg-light-slate-3 text-light-slate-11"
                  >
                    <HiOutlineSparkles className="text-base" />
                  </button>
                </Tooltip>
                <TextInput
                  className="text-xs"
                  value={pullrequestLink}
                  handleChange={(value) => setPullRequestLink(value)}
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
        >
          <RxPencil1 className="text-3xl" />
        </div>
      </Fab>
    </form>
  );
};

export default HighlightInputForm;
