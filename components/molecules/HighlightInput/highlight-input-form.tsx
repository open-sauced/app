import Button from "components/atoms/Button/button";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const HighlightInputForm = (): JSX.Element => {
  const [isDivFocused, setIsDivFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState("");
  const [row, setRow] = useState(1);
  const [title, setTitle] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  let rowLomit = 5;
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

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDivFocused, bodyText]);

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
  const handlePostHighlight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDivFocused(false);
    // Trigger api call to post highlight
    setBodyText("");
    setTitle("");
  };

  return (
    <form onSubmit={handlePostHighlight} ref={ref} className="flex flex-col gap-4">
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
        <textarea
          rows={row}
          value={bodyText}
          onChange={(e) => handleTextAreaInputChange(e)}
          ref={textAreaRef}
          className={`resize-none font-normal text-light-slate-11 mb-2 transition focus:outline-none rounded-lg ${
            !isDivFocused ? "hidden" : ""
          }`}
        />
      </div>

      {isDivFocused && (
        <Button disabled={!bodyText} className="ml-auto" type="primary">
          Post
        </Button>
      )}
    </form>
  );
};

export default HighlightInputForm;
