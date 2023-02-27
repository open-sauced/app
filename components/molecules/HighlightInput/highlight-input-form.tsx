import Button from "components/atoms/Button/button";
import { Textarea } from "components/atoms/Textarea/text-area";
import { createHighlights } from "lib/hooks/createHighlights";

import { ToastTrigger } from "lib/utils/toast-trigger";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";

const HighlightInputForm = (): JSX.Element => {
  const { user } = useSupabaseAuth();
  const { mutate } = useSWRConfig();
  const [isDivFocused, setIsDivFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState("");
  const [row, setRow] = useState(1);
  const [title, setTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [pullrequestLink, setPullRequestLink] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  let rowLomit = 5;
  const wordLimit = 500;
  let messageLastScrollHeight = textAreaRef.current ? textAreaRef.current?.scrollHeight : 50;

  useEffect(() => {
    const checkIfClickedOutside = (e: globalThis.MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDivFocused && ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsDivFocused(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    const pullLink = bodyText.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/);
    const link =
      pullLink && new URL(pullLink.includes("https://") ? (pullLink as unknown as string) : `https://${pullLink}`);

    if (pullLink && pullLink.length > 0 && link?.hostname === "github.com" && link?.pathname.includes("pull")) {
      setPullRequestLink(pullLink[0]);
    } else {
      setPullRequestLink("");
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDivFocused, bodyText, pullrequestLink]);

  const handleTextAreaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
    if (row < rowLomit && textAreaRef.current && textAreaRef.current?.scrollHeight > messageLastScrollHeight) {
      setRow((prev) => prev + 1);
    } else if (row > 1 && textAreaRef.current && textAreaRef.current?.scrollHeight < messageLastScrollHeight) {
      setRow((prev) => prev--);
    }
    if (!bodyText) setRow(1);
    messageLastScrollHeight = textAreaRef.current?.scrollHeight || 60;
  };

  // Handle submit highlights
  const handlePostHighlight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wordCount > wordLimit) {
      ToastTrigger({ message: "Character limit exceeded", type: "error" });
      return;
    }
    // Trigger api call to post highlight
    const pullLink = bodyText.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/);

    const link = pullLink && new URL(pullLink as unknown as string);
    const [url] = pullLink || [];
    const highlight = bodyText.replace(url as string, "");

    if (url === null || url === undefined || url === "" || url.length === 0 || link?.hostname !== "github.com") {
      ToastTrigger({ message: "A valid Pull request Link is required", type: "error" });
      return;
    } else {
      const res = await createHighlights({
        highlight,
        title,
        url: url || ""
      });

      if (res) {
        mutate(`users/${user?.user_metadata.user_name}/highlights`);
        setBodyText("");
        setTitle("");
        setIsDivFocused(false);
        ToastTrigger({ message: "Highlight uploade success", type: "success" });
      } else {
        ToastTrigger({ message: "An error occured!!!", type: "error" });
      }
    }
  };

  return (
    <form onSubmit={handlePostHighlight} ref={ref} className="flex flex-1 flex-col gap-4">
      <div
        onClick={() => {
          setIsDivFocused(true);
        }}
        className="bg-white p-2 flex border rounded-lg text-sm overflow-hidden flex-col gap-2 "
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" focus:outline-none "
          type="text"
          placeholder={isDivFocused ? "Add title (optional)" : "Highlight your merged PRs and provide a link!"}
        />
        <Textarea
          className={`resize-none font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg ${
            !isDivFocused ? "hidden" : ""
          }`}
          ref={textAreaRef}
          rows={row}
          value={bodyText}
          onChange={(e) => {
            handleTextAreaInputChange(e);
            setWordCount(e.target.value.length);
          }}
        />
        {isDivFocused && (
          <p className="text-xs p-2 text-light-slate-9 flex justify-end gap-1">
            <span className={`${wordCount - pullrequestLink.length > wordLimit && "text-red-600"}`}>
              {wordCount - pullrequestLink.length > wordLimit
                ? `-${wordCount - pullrequestLink.length - wordLimit}`
                : wordCount - pullrequestLink.length}
            </span>{" "}
            / <span>{wordLimit}</span>
          </p>
        )}
      </div>

      {pullrequestLink && isDivFocused && <GhOpenGraphImg githubLink={pullrequestLink} />}

      {isDivFocused && (
        <Button disabled={!bodyText} className="ml-auto" variant="primary">
          Post
        </Button>
      )}
    </form>
  );
};

export default HighlightInputForm;
