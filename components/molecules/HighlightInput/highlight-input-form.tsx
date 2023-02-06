import Button from "components/atoms/Button/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const HighlightInputForm = (): JSX.Element => {
  const [isDivFocused, setIsDivFocused] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState<string>("");
  const [row, setRow] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);
  let rowLomit = 5;
  let messageLastScrollHeight = textAreaRef.current ? textAreaRef.current?.scrollHeight : 50;

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDivFocused && ref.current && !ref.current.contains(e.target)) {
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
    messageLastScrollHeight = textAreaRef.current?.scrollHeight || 65;
  };

  // Handle submit highlights
  const handlePostHighlight = () => {
    // Trigger api call to post highlight
    setBodyText("");
    setTitle("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handlePostHighlight();
        setIsDivFocused(false);
      }}
      ref={ref}
      className="flex flex-col gap-4"
    >
      <div
        onClick={() => {
          setIsDivFocused(true);
        }}
        className="bg-white  flex border rounded-lg overflow-hidden flex-col gap-2 "
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" focus:outline-none p-2"
          type="text"
          placeholder={isDivFocused ? "Add title (optional)" : "Highlight your merged PRs and provide a link!"}
        />
        <textarea
          rows={row}
          value={bodyText}
          onChange={(e) => handleTextAreaInputChange(e)}
          ref={textAreaRef}
          className={`resize-none p-2 mx-1 mb-2 transition focus:outline-none focus:border border-light-slate-2 rounded-lg ${
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
