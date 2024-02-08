import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaRegPaste } from "react-icons/fa6";
import { useEffectOnce } from "react-use";

interface PickReposOrOrgStepProps {
  onSearchRepos: () => void;
  onPasteRepos: () => void;
  onImportOrg: () => void;
}

export const PickReposOrOrgStep = ({ onSearchRepos, onPasteRepos, onImportOrg }: PickReposOrOrgStepProps) => {
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
          onClick={onSearchRepos}
        >
          <FaSearch size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Search for repositories
          </span>
          <span className="text-left">Search for specific repositories to track on your workspace.</span>
        </button>

        <button
          ref={buttonRef}
          className="flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100"
          onClick={onPasteRepos}
        >
          <FaRegPaste size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Import repositories
          </span>
          <span className="text-left">Paste a list of repositories to track on your workspace</span>
        </button>

        <button
          className="flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100 cursor-not-allowed disabled:opacity-50"
          title="coming soon"
          onClick={onImportOrg}
          disabled
        >
          <FaGithub size={20} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Import a Github Organization
          </span>
          <span className="text-left">Search for organizations on Github and import any or all repositories.</span>
        </button>
      </div>
    </>
  );
};
