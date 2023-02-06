import Button from "components/atoms/Button/button";
import { useEffect, useRef, useState } from "react";

const HighlightInputForm = (): JSX.Element => {
  const [isDivFocused, setIsDivFocused] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [bodyText, setBodyText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);

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
  }, [isDivFocused]);

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
        className="bg-white p-2 flex border rounded-lg overflow-hidden flex-col gap-2 "
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" focus:outline-none"
          type="text"
          placeholder={isDivFocused ? "Add title (optional)" : "Highlight your merged PRs and provide a link!"}
        />
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          ref={textAreaRef}
          className={`resize-none focus:outline-none ${!isDivFocused ? "hidden" : ""}`}
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
