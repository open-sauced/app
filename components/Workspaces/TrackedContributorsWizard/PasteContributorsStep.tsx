import { useState } from "react";
import Button from "components/atoms/Button/button";

interface PasteContributorsStepProps {
  onBulkAddContributors: (contributors: string[]) => void;
}

export const PasteContributorsStep = ({ onBulkAddContributors }: PasteContributorsStepProps) => {
  const [pastedInput, setPastedInput] = useState("");

  const parseInput = () => {
    // split each line into a trimmed string and filter out any empty lines
    const contributors = pastedInput
      .split(pastedInput.includes(",") ? "," : "\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    onBulkAddContributors(contributors);
  };

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <textarea
        value={pastedInput}
        onChange={(e) => setPastedInput(e.target.value)}
        placeholder="Paste contributors here line by line (e.g. open-sauced/app)"
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
