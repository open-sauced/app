import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaGithub, FaRegPaste } from "react-icons/fa6";
import { useEffectOnce } from "react-use";

interface PickContributorStepProps {
  onSearchContributors: () => void;
  onPasteContributors: () => void;
  onSelectFollowingContributors: () => void;
}

export const PickContributorStep = ({
  onSearchContributors,
  onPasteContributors,
  onSelectFollowingContributors,
}: PickContributorStepProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffectOnce(() => {
    buttonRef.current?.focus();
  });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2" data-tracked-repo-wizard>
        <button
          ref={buttonRef}
          className="flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100"
          onClick={onSearchContributors}
        >
          <FaSearch size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Search for contributors
          </span>
          <span className="text-left">Search for contributors from repositories in your workspace.</span>
        </button>

        <button
          className="flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100"
          onClick={onPasteContributors}
        >
          <FaRegPaste size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Import contributors
          </span>
          <span className="text-left">Paste a list of contributors to track on your workspace</span>
        </button>

        <button
          className="flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100"
          onClick={onSelectFollowingContributors}
        >
          <FaGithub size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Sync GitHub Following
          </span>
          <span className="text-left">Import users that you follow from contributors</span>
        </button>
      </div>
    </>
  );
};
