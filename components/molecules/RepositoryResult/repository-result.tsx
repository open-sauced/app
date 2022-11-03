import Button from "components/atoms/Button/button";
import React from "react";
import RepoCardProfile from "../RepoCardProfile/repo-card-profile";

const Repositorieresult = () => {
  return (
    <div className="flex justify-between">
      <RepoCardProfile orgName="open sauced" prCount={23} issueCount={102} avatar="" repoName="insights" />
      <Button type="text">Add Repository</Button>
    </div>
  );
};

export default Repositorieresult;
