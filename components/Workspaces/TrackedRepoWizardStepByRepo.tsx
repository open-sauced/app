import { TrackedRepoWizardLayout } from "./TrackedRepoWizard/TrackedRepoWizardLayout";

interface TrackedRepoWizardStepByRepoProps {
  onAddToTrackingList: () => void;
  onSearchRepos: () => void;
  onImportOrg: () => void;
  onCancel: () => void;
  trackedReposCount: number;
}

export const TrackedRepoWizardStepByRepo = ({
  onAddToTrackingList,
  onCancel,
  trackedReposCount,
}: TrackedRepoWizardStepByRepoProps) => {
  return (
    <TrackedRepoWizardLayout
      onAddToTrackingList={onAddToTrackingList}
      trackedReposCount={trackedReposCount}
      onCancel={onCancel}
    >
      <p>search</p>

      <p>No repositories added yet!</p>
      <p>Use the search bar to find the repositories you want to track on your workspace.</p>
    </TrackedRepoWizardLayout>
  );
};
