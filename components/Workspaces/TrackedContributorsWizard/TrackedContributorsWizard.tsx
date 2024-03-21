import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useSearchContributors } from "lib/hooks/useSearchContributors";
import { TrackedContributorsWizardLayout } from "./TrackedContributorsWizardLayout";

import { PickContributorStep } from "./PickContributorStep";
import { SearchByContributorsStep } from "./SearchByContributorsStep";
import { PasteContributorsStep } from "./PasteContributorsStep";
import { FilterPastedContributorsStep } from "./FilterPastedContributorsStep";
import { SelectFollowingStep } from "./SelectFollowingStep";

interface TrackedContributorsWizardProps {
  onAddToTrackingList: (contributors: Map<string, boolean>) => void;
  onCancel: () => void;
  onCloseModal: () => void;
}

type TrackedContributorsStep =
  | "pickOption"
  | "pickContributors"
  | "pasteContributors"
  | "pickOrg"
  | "filterPastedContributors"
  | "selectFollowing";

export const TrackedContributorsWizard = ({
  onAddToTrackingList,
  onCancel,
  onCloseModal,
}: TrackedContributorsWizardProps) => {
  const [step, setStep] = useState<TrackedContributorsStep>("pickOption");
  const [currentTrackedContributors, setCurrentTrackedContributors] = useState<Map<string, boolean>>(new Map());
  const suggestedContributors: any[] = [];

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const { data, isError, isLoading } = useSearchContributors(searchTerm);

  const [, , removePastedInput] = useLocalStorage("bulk-add-contributors", "");

  const onToggleContributor = (contributor: string, isSelected: boolean) => {
    setSearchTerm(undefined);

    setCurrentTrackedContributors((currentTrackedContributors) => {
      const updates = new Map(currentTrackedContributors);
      updates.set(contributor, isSelected);

      return updates;
    });
  };

  const onSelectContributor = (contributor: string) => {
    onToggleContributor(contributor, true);
  };

  const onToggleAllContributors = (checked: boolean) => {
    setCurrentTrackedContributors((currentTrackedContributors) => {
      const updates = new Map(currentTrackedContributors);

      for (const [contributor] of updates) {
        updates.set(contributor, checked);
      }

      return updates;
    });
  };

  const onBulkAddContributors = (contributors: string[]) => {
    for (const contributor of contributors) {
      onToggleContributor(contributor, true);
    }
    setStep("filterPastedContributors");
  };

  let searchedContributors = data ?? [];

  function goBack() {
    switch (step) {
      case "pickOption":
        onCancel();
        break;
      case "filterPastedContributors":
        setStep("pasteContributors");
        break;
      default:
        setStep("pickOption");
    }
  }

  function onSearchContributors(searchTerm?: string) {
    if (searchTerm && searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm(undefined);
    }
  }

  const contributors = currentTrackedContributors;

  const renderStep = (step: TrackedContributorsStep) => {
    switch (step) {
      case "pickOption":
        return (
          <PickContributorStep
            onSearchContributors={() => {
              setStep("pickContributors");
            }}
            onPasteContributors={() => {
              setStep("pasteContributors");
            }}
            onSelectFollowingContributors={() => {
              setStep("selectFollowing");
            }}
          />
        );

      case "pickContributors":
        return (
          <SearchByContributorsStep
            onSelectContributor={onSelectContributor}
            onToggleContributor={onToggleContributor}
            onToggleAllContributors={onToggleAllContributors}
            onSearch={onSearchContributors}
            contributors={contributors}
            searchedContributors={searchedContributors}
            suggestedContributors={suggestedContributors}
          />
        );

      case "pasteContributors":
        return <PasteContributorsStep onBulkAddContributors={onBulkAddContributors} />;

      case "filterPastedContributors":
        return (
          <FilterPastedContributorsStep
            contributors={trackedContributors}
            onToggleContributor={onToggleContributor}
            onToggleAllContributors={onToggleAllContributors}
          />
        );

      case "selectFollowing": {
        return (
          <SelectFollowingStep
            contributors={trackedContributors}
            onToggleContributor={onToggleContributor}
            onToggleAllContributors={onToggleAllContributors}
          />
        );
      }

      // TODO: other steps

      default:
        return null;
    }
  };

  const trackedContributors = new Map(currentTrackedContributors);

  return (
    <TrackedContributorsWizardLayout
      onAddToTrackingList={() => {
        removePastedInput();
        onAddToTrackingList(currentTrackedContributors);
      }}
      trackedContributorsCount={trackedContributors.size}
      onCancel={() => {
        goBack();
      }}
      onCloseModal={onCloseModal}
    >
      {renderStep(step)}
    </TrackedContributorsWizardLayout>
  );
};
