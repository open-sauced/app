import { FaSearch } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import Card from "components/atoms/Card/card";
import Button from "components/atoms/Button/button";

interface TrackedRepoWizardProps {
  onAddToTrackingList: () => void;
  onSearchRepos: () => void;
  onImportOrg: () => void;
  onCancel: () => void;
  trackedReposCount: number;
}

export const TrackedRepoWizard = ({
  onAddToTrackingList,
  onSearchRepos,
  onImportOrg,
  onCancel,
  trackedReposCount,
}: TrackedRepoWizardProps) => {
  return (
    <Card className="p-0 w-max max-w-2xl">
      <button className="flex gap-1 items-center ml-4 mt-4 border border-transparent" onClick={onCancel}>
        <FaArrowLeft /> back
      </button>
      <div className="flex flex-col justify-between gap-4">
        <div className="px-4 pt-2">
          <h2 className="font-semibold mb-4">Add repositories to track</h2>
          <div className="grid gap-6 md:grid-cols-2" data-tracked-repo-wizard>
            <button
              className="flex flex-col gap-2 text-light-slate-12 p-8 border rounded-lg items-left focus-visible:!border-green-800 focus-visible:!ring-green-100"
              onClick={onSearchRepos}
            >
              <FaSearch className="text-purple-800 " />
              <span data-button-title className="font-semibold">
                Search for repositories
              </span>
              <span>Search for specific repositories to track on your workspace.</span>
            </button>
            <button
              className="flex flex-col gap-2 text-light-slate-12 p-8 border rounded-lg items-left focus-visible:!border-green-800 focus-visible:!ring-green-100"
              onClick={onImportOrg}
            >
              <BiBarChartAlt2 className="text-purple-800" />
              <span data-button-title className="font-semibold">
                Import a Github Organization
              </span>
              <span>Search for organizations on Github and import any or all repositories.</span>
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end border-t-1 p-4">
          <span>
            <span className="font-semibold">{trackedReposCount}</span> Selected repositories
          </span>
          <Button
            variant="primary"
            onClick={() => {
              onAddToTrackingList();
            }}
          >
            Add to tracking list
          </Button>
        </div>
      </div>
    </Card>
  );
};
