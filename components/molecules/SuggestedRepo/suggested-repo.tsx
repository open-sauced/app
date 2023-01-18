import React from "react";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";

import Button from "components/atoms/Button/button";
import Avatar from "components/atoms/Avatar/avatar";
import RepoCardProfile, { RepoCardProfileProps } from "../RepoCardProfile/repo-card-profile";

interface SuggestedRopsitoryProps {
  data?: RepoCardProfileProps;
}
const SuggestedRepository = ({ data }: SuggestedRopsitoryProps) => {
  // Utilizing static data for testing purpose until real data is available
  return (
    <div className="flex justify-between items-center">
      <RepoCardProfile {...data} />
      <Button type="text" className="!border !border-light-slate-6 !shadow-input">
        Add to Page
      </Button>
    </div>
  );
};

export default SuggestedRepository;
