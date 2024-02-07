import { useState } from "react";
import Button from "components/atoms/Button/button";

interface PasteReposStepProps {
  onBulkAddRepos: (repos: string[]) => void;
}

export const PasteReposStep = ({ onBulkAddRepos }: PasteReposStepProps) => {
  const [pastedInput, setPastedInput] = useState("");

  const parseInput = () => {
    // split each line into a trimmed string and filter out any empty lines
    const repos = pastedInput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    onBulkAddRepos(repos);
  };

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <textarea
        value={pastedInput}
        onChange={(e) => setPastedInput(e.target.value)}
        placeholder="Paste repositories here line by line (e.g. open-sauced/app)"
        className="p-4 border rounded-xl h-full outline-none focus-visible:ring focus-visible:border-orange-500 focus-visible:ring-orange-100"
      />
      <Button
        onClick={parseInput}
        variant="primary"
        disabled={pastedInput.trim().length === 0}
        className="w-fit self-end"
      >
        Import
      </Button>
    </div>
  );
};
