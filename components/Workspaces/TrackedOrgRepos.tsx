import { FaPlus } from "react-icons/fa6";
import Button from "components/atoms/Button/button";

interface TrackedOrgReposProps {
  onAddOrgRepo: () => void;
}

export const TrackedOrgRepos = ({ onAddOrgRepo }: TrackedOrgReposProps) => {
  return (
    <>
      <div className="flex justify-between items-center gap-6 w-full">
        <div>
          <h2>Organizations and Repositories Tracked</h2>
          <p className="prose prose-sm">Select the organizations or repositories you want to track</p>
        </div>
        <Button
          variant="primary"
          className="flex gap-2.5 items-center cursor-pointer w-min mt-2 sm:mt-0"
          onClick={(event) => {
            event.preventDefault();
            onAddOrgRepo();
          }}
        >
          <FaPlus className="text-lg" />
          <span>Add Organization or Repository</span>
        </Button>
      </div>
      <div>Tracked Org and Repos component</div>
    </>
  );
};

export default TrackedOrgRepos;
