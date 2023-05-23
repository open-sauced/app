import { ChangeEvent, useEffect, useRef, useState } from "react";

import { BsCalendar2Event } from "react-icons/bs";
import { format } from "date-fns";

import Button from "components/atoms/Button/button";
import { Textarea } from "components/atoms/Textarea/text-area";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Collapsible/collapsible";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { Calendar } from "../Calendar/calendar";

import { createHighlights } from "lib/hooks/createHighlights";
import { generateApiPrUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";
import { useToast } from "lib/hooks/useToast";

interface HighlightInputFormProps {
  refreshCallback?: Function;
}

const HighlightInputForm = ({ refreshCallback }: HighlightInputFormProps): JSX.Element => {
  const [isDivFocused, setIsDivFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState("");
  const [row, setRow] = useState(4);
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [pullrequestLink, setPullRequestLink] = useState("");

  let rowLomit = 10;
  const charLimit = 500;
  let messageLastScrollHeight = textAreaRef.current ? textAreaRef.current?.scrollHeight : 50;

  const [date, setDate] = useState<Date | undefined>();

  const { toast } = useToast();

  const validCharLimit = () => {
    return charCount - pullrequestLink.length <= charLimit;
  };

  useEffect(() => {
    const pullLink = bodyText.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/);
    const link =
      pullLink && new URL(pullLink.includes("https://") ? (pullLink as unknown as string) : `https://${pullLink}`);

    if (pullLink && pullLink.length > 0 && link?.hostname === "github.com" && link?.pathname.includes("pull")) {
      setPullRequestLink(pullLink[0]);
    } else {
      setPullRequestLink("");
    }
  }, [bodyText, pullrequestLink]);

  const handleTextAreaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
    if (row < rowLomit && textAreaRef.current && textAreaRef.current?.scrollHeight > messageLastScrollHeight) {
      setRow((prev) => prev + 1);
    } else if (row > 1 && textAreaRef.current && textAreaRef.current?.scrollHeight < messageLastScrollHeight) {
      setRow((prev) => prev--);
    }
    if (!bodyText) setRow(1);
    messageLastScrollHeight = textAreaRef.current?.scrollHeight || 80;
  };

  // Handle submit highlights
  const handlePostHighlight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Regex check for github pull request link match
    const pullLink = bodyText.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/);

    const [url] = pullLink || [];
    const highlight = bodyText.replace(url as string, "");

    if (pullLink && url) {
      const { apiPaths } = generateApiPrUrl(url);
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
          url: url,
          shipped_at: date
        });

        setLoading(false);

        if (typeof res === "string") {
          return toast({ description: res, title: "Error", variant: "danger" });
        }

        refreshCallback && refreshCallback();
        setBodyText("");
        setTitle("");
        setDate(undefined);
        setIsDivFocused(false);
        toast({ description: "Highlight Posted!", title: "Success", variant: "success" });
      }
    } else {
      toast({ description: "Please provide a valid pull request link!", title: "Error", variant: "danger" });
    }
  };

  return (
    <form onSubmit={handlePostHighlight} className="flex flex-col flex-1 gap-4">
      <Collapsible onOpenChange={setIsDivFocused} open={isDivFocused}>
        <div className="flex flex-col gap-2 p-2 overflow-hidden text-sm bg-white border rounded-lg ">
          <CollapsibleTrigger asChild>
            <div className="flex pr-2">
              <input
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 focus:outline-none"
                type="text"
                placeholder={
                  isDivFocused ? "Add title (optional)" : "Click here to highlight your merged PRs and provide a link!"
                }
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Textarea
              className={`resize-y min-h-[80px] max-h-99 font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg ${
                !isDivFocused ? "hidden" : ""
              }`}
              ref={textAreaRef}
              rows={row}
              value={bodyText}
              placeholder={`Share your thoughts and link to it.

https://github.com/open-sauced/insights/pull/913`}
              onChange={(e) => {
                handleTextAreaInputChange(e);
                setCharCount(e.target.value.length);
              }}
            />

            <div className="flex justify-between">
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

              <p className="flex justify-end gap-1 pb-2 text-xs text-light-slate-9">
                <span className={`${!validCharLimit() && "text-red-600"}`}>
                  {!validCharLimit()
                    ? `-${charCount - pullrequestLink.length - charLimit}`
                    : charCount - pullrequestLink.length}
                </span>
                / <span>{charLimit}</span>
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {pullrequestLink && isDivFocused && <GhOpenGraphImg githubLink={pullrequestLink} />}

      {isDivFocused && (
        <Button loading={loading} disabled={!bodyText || !validCharLimit()} className="ml-auto " variant="primary">
          Post
        </Button>
      )}
    </form>
  );
};

export default HighlightInputForm;
