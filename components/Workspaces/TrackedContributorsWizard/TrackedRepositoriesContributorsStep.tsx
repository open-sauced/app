import { useState } from "react";
import Button from "components/atoms/Button/button";
import { SearchByReposStep } from "../TrackedRepoWizard/SearchByReposStep";

interface TrackedRepositoriesContributorsStepProps {
  onSelectRepo: (repo: string) => void;
  onToggleRepo: (repo: string, isSelected: boolean) => void;
  onToggleAllRepos: (checked: boolean) => void;
  onSelectContributor: (contributor: string) => void;
  onToggleContributor: (contributor: string, isSelected: boolean) => void;
  onToggleAllContributors: (checked: boolean) => void;
  repositories: Map<string, boolean>;
}
export const TrackedRepositoriesContributorsStep = ({
  onSelectRepo,
  onToggleRepo,
  onToggleAllRepos,
  onSelectContributor,
  onToggleContributor,
  onToggleAllContributors,
  repositories,
}: TrackedRepositoriesContributorsStepProps) => {
  const [step, setStep] = useState("repositories");
  const disabled = !Array.from(repositories.values()).some((isSelected) => isSelected);

  switch (step) {
    case "repositories":
      return (
        <>
          <SearchByReposStep
            onSelectRepo={onSelectRepo}
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
            repositories={repositories}
          />
          <div className="flex justify-end">
            <Button
              disabled={disabled}
              onClick={() => {
                setStep("contributors");
              }}
              variant="primary"
            >
              Next
            </Button>
          </div>
        </>
      );

    case "contributors":
      return <p>contributors</p>;

    default:
      throw new Error("Invalid step");
  }
};
