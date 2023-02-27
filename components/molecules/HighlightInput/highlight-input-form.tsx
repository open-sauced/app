import Button from "components/atoms/Button/button";
import { Textarea } from "components/atoms/Textarea/text-area";
import { createHighlights } from "lib/hooks/createHighlights";

import { ToastTrigger } from "lib/utils/toast-trigger";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import GhOpenGraphImg from "../GhOpenGraphImg/gh-open-graph-img";
import { generateApiPrUrl } from "lib/utils/github";
import { fetchGithubPRInfo } from "lib/hooks/fetchGithubPRInfo";

const HighlightInputForm = (): JSX.Element => {
  const { user } = useSupabaseAuth();
  const { mutate } = useSWRConfig();
  const [isDivFocused, setIsDivFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState("");
  const [row, setRow] = useState(1);
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [pullrequestLink, setPullRequestLink] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  let rowLomit = 5;
  const charLimit = 500;
  let messageLastScrollHeight = textAreaRef.current ? textAreaRef.current?.scrollHeight : 50;

  const validCharlimit = () => {
    return charCount - pullrequestLink.length <= charLimit;
  };

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
        ToastTrigger({ message: "A valid Pull request Link is required", type: "error" });
        return;
      } else {
        setLoading(true);
        const res = await createHighlights({
          highlight,
          title,
          url: url
        });

        setLoading(false);
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
            setCharCount(e.target.value.length);
          }}
        />
        {isDivFocused && (
          <p className="text-xs pb-2 text-light-slate-9 flex justify-end gap-1">
            <span className={`${!validCharlimit() && "text-red-600"}`}>
              {!validCharlimit()
                ? `-${charCount - pullrequestLink.length - charLimit}`
                : charCount - pullrequestLink.length}
            </span>{" "}
            / <span>{charLimit}</span>
          </p>
        )}
      </div>

      {pullrequestLink && isDivFocused && <GhOpenGraphImg githubLink={pullrequestLink} />}

      {isDivFocused && (
        <Button loading={loading} disabled={!bodyText || !validCharlimit()} className="ml-auto" variant="primary">
          Post
        </Button>
      )}
    </form>
  );
};

export default HighlightInputForm;
