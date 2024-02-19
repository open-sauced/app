import { PlusCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegPaste } from "react-icons/fa6";
import { useEffectOnce } from "react-use";

interface PickContributorStepProps {
  onSearchContributors: () => void;
  onPasteContributors: () => void;
  onSearchContributorsByRepo: () => void;
  isSearchByTrackedReposEnabled?: boolean;
}

export const PickContributorStep = ({
  onSearchContributors,
  onPasteContributors,
  onSearchContributorsByRepo,
  isSearchByTrackedReposEnabled = true,
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
          className={clsx(
            "flex flex-col text-light-slate-12 p-8 border rounded-lg focus-visible:!border-green-800 focus-visible:!ring-green-100",
            !isSearchByTrackedReposEnabled && "opacity-50"
          )}
          onClick={isSearchByTrackedReposEnabled ? onSearchContributorsByRepo : undefined}
          disabled={!isSearchByTrackedReposEnabled}
          {...(isSearchByTrackedReposEnabled
            ? {}
            : { "aria-disabled": true, title: "You need to track at least one repository to use this feature" })}
        >
          <PlusCircleIcon width={24} height={24} className="text-purple-800 mb-2" />
          <span data-button-title className="font-semibold">
            Import from tracked repositories
          </span>
          <span className="text-left">
            Browse your tracked repositories and select the ones you want to import contributors from
          </span>
        </button>
      </div>
    </>
  );
};
