import Button from "components/atoms/Button/button";
import React from "react";

interface HighlightPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  prompt: string;
}

/**
 ** This component is subject to change. It is currently a placeholder for the prompt of the month.
 ** The buttons are not functional. They are placeholders for the functionality that will be added later.
 */
const HighlightPrompt = ({ prompt }: HighlightPromptProps) => {
  return (
    <div className="p-6 space-y-3 border rounded-lg border-light-slate-6 w-max">
      <h3 className="text-sm font-normal text-light-slate-11">Prompt of the month</h3>
      <p className="w-64 pr-3 text-2xl">{prompt}</p>
      <div className="flex gap-3 mt-2">
        <Button className="border text-light-orange-10 border-light-orange-7 bg-light-orange-3" variant="text">
          Post an answer
        </Button>
        <Button className="border text-light-orange-10 border-light-orange-7" variant="text">
          See answers
        </Button>
      </div>
    </div>
  );
};

export default HighlightPrompt;
