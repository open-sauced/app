import { useLocalStorage } from "react-use";
import Button from "components/shared/Button/button";

interface PasteReposStepProps {
  onBulkAddRepos: (repos: string[]) => void;
}

export const PasteReposStep = ({ onBulkAddRepos }: PasteReposStepProps) => {
  const [pastedInput, setPastedInput] = useLocalStorage("bulk-add-repos", "");

  const loadSbomRepos = async (repos: string[]) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos/sbom?repos=${repos.join(",")}`);

    if (response.ok) {
      const sbomData: Record<string, string[]> = await response.json();
      let collectedRepos: string[] = [];
      Object.keys(sbomData).forEach((key) => {
        collectedRepos = collectedRepos.concat(sbomData[key]);
      });

      onBulkAddRepos(collectedRepos);
    }
  };

  const parseInput = () => {
    const repos = pastedInput!
      .split(/[,\n ]/g) // split by either comma, new line, or space
      .map((line) => {
        line.trim(); // trim to remove whitespace

        // only take the 'org/repo' from URL, otherwise use the current line
        const { repo } = /[https:\/\/]?github.com\/(?<repo>[^\/]+\/[^\/]+)/gm.exec(line)?.groups || { repo: line };

        // return the line
        return repo;
      })
      .filter((line) => line !== ""); // remove any empty lines

    return repos;
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
        onClick={() => onBulkAddRepos(parseInput())}
        variant="primary"
        disabled={pastedInput!.trim().length === 0}
        className="w-fit self-end"
      >
        Import
      </Button>
      <Button
        onClick={() => loadSbomRepos(parseInput())}
        variant="primary"
        disabled={pastedInput!.trim().length === 0}
        className="w-fit self-end"
      >
        Import SBOM
      </Button>
    </div>
  );
};
