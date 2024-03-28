import { useLocalStorage } from "react-use";
import { useEffect, useState } from "react";
import { useSearchRepos } from "lib/hooks/useSearchRepos";
import { useUserOrganizations } from "lib/hooks/useUserOrganizations";
import { useGetOrgRepos } from "lib/hooks/useGetOrgRepos";
import useStore from "../../../lib/store";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";
import { TrackedRepoWizardLayout } from "./TrackedRepoWizardLayout";
import { SearchByReposStep } from "./SearchByReposStep";
import { PasteReposStep } from "./PasteReposStep";
import { FilterPastedReposStep } from "./FilterPastedReposStep";
import { SelectOrgReposStep } from "./SelectOrgReposStep";
import { SearchOrgStep } from "./SearchOrgStep";

interface TrackedReposWizardProps {
  onAddToTrackingList: (repos: Map<string, boolean>) => void;
  onCancel: () => void;
  onCloseModal: () => void;
}

type TrackedReposStep =
  | "pickReposOrOrg"
  | "pickRepos"
  | "pasteRepos"
  | "pickOrg"
  | "filterPastedRepos"
  | "pickOrgRepos";

async function organizationExists(orgSearchTerm: string) {
  const response = await fetch(`https://api.github.com/orgs/${orgSearchTerm}`);

  return response.status === 200;
}

export const TrackedReposWizard = ({ onAddToTrackingList, onCancel, onCloseModal }: TrackedReposWizardProps) => {
  const [step, setStep] = useState<TrackedReposStep>("pickReposOrOrg");
  const [organization, setOrganization] = useState<string | undefined>();
  const [currentTrackedRepositories, setCurrentTrackedRepositories] = useState<Map<string, boolean>>(new Map());

  const suggestedRepos: any[] = [];
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [orgSearchTerm, setOrgSearchTerm] = useState<string | undefined>();
  const [filteredOrgs, setFilteredOrgs] = useState<Set<string>>(new Set());

  const [pastedInput, setPastedInput, removePastedInput] = useLocalStorage("bulk-add-repos", "");

  const { data, isError, isLoading } = useSearchRepos(searchTerm);
  const username: string | null = useStore((state) => state.user?.user_metadata.user_name);
  const { data: rawUserOrgs, isError: orgsError, isLoading: orgsLoading } = useUserOrganizations(username);

  const {
    data: rawOrgRepos,
    isError: isOrgReposError,
    isLoading: isLoadingOrgRepos,
  } = useGetOrgRepos({ organization });

  useEffect(() => {
    if (isOrgReposError || isLoadingOrgRepos) {
      return;
    }

    if (rawOrgRepos) {
      setCurrentTrackedRepositories((currentTrackedRepositories) => {
        const updates = new Map(currentTrackedRepositories);
        for (const repo of rawOrgRepos) {
          if (!updates.has(repo)) {
            updates.set(repo, true);
          }
        }
        return updates;
      });
    }
    // It's a weird scenario. If the organization has changed, rawOrgRepos will be set
    // passing it as a dependency will cause an infinite loop though as the reference to it
    // keeps changing. This is a workaround to avoid that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization, isOrgReposError, isLoadingOrgRepos]);

  useEffect(() => {
    if (rawUserOrgs) {
      const orgs = rawUserOrgs.map((org) => org.organization_user.login);
      const orgRepos = new Set(
        orgs.filter((repo) => !orgSearchTerm || repo.toLowerCase().includes(orgSearchTerm.toLowerCase()))
      );

      if (orgSearchTerm) {
        organizationExists(orgSearchTerm).then((orgExists) => {
          if (orgExists) {
            setFilteredOrgs(new Set([...orgRepos, orgSearchTerm]));
          } else {
            setFilteredOrgs(orgRepos);
          }
        });
      } else {
        setFilteredOrgs(orgRepos);
      }
    }
  }, [rawUserOrgs, orgSearchTerm]);

  const onToggleRepo = (repo: string, isSelected: boolean) => {
    setSearchTerm(undefined);
    setCurrentTrackedRepositories((currentTrackedRepositories) => {
      const updates = new Map(currentTrackedRepositories);
      updates.set(repo, isSelected);

      return updates;
    });
  };

  const onSelectRepo = (repo: string) => {
    onToggleRepo(repo, true);
  };

  const onToggleAllRepos = (checked: boolean) => {
    setCurrentTrackedRepositories((currentTrackedRepositories) => {
      const updates = new Map(currentTrackedRepositories);

      for (const [repo] of updates) {
        updates.set(repo, checked);
      }

      return updates;
    });
  };

  const onBulkAddRepos = (repos: string[]) => {
    for (const repo of repos) {
      onToggleRepo(repo, true);
    }
    setStep("filterPastedRepos");
  };

  let searchedRepos = data ?? [];

  function goBack() {
    switch (step) {
      case "pickReposOrOrg":
        onCancel();
        break;
      case "filterPastedRepos":
        setStep("pasteRepos");
        break;
      case "pickOrgRepos":
        setStep("pickOrg");
        setOrgSearchTerm(undefined);
        break;
      default:
        setStep("pickReposOrOrg");
        break;
    }
  }

  function onSearchRepos(searchTerm?: string) {
    if (searchTerm && searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm(undefined);
    }
  }

  const repositories = currentTrackedRepositories;

  const renderStep = (step: TrackedReposStep) => {
    switch (step) {
      case "pickReposOrOrg":
        return (
          <PickReposOrOrgStep
            onSearchRepos={() => {
              setStep("pickRepos");
            }}
            onPasteRepos={() => {
              setStep("pasteRepos");
            }}
            onImportOrg={() => {
              setStep("pickOrg");
            }}
          />
        );

      case "pickRepos":
        return (
          <SearchByReposStep
            onSelectRepo={onSelectRepo}
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
            onSearch={onSearchRepos}
            repositories={repositories}
            searchedRepos={searchedRepos}
            suggestedRepos={suggestedRepos}
          />
        );
      case "pasteRepos":
        return <PasteReposStep onBulkAddRepos={onBulkAddRepos} />;
      case "filterPastedRepos":
        return (
          <FilterPastedReposStep
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
            repositories={repositories}
          />
        );
      case "pickOrg":
        return (
          <SearchOrgStep
            onSelectOrg={(org) => {
              setOrganization(org);
              setStep("pickOrgRepos");
            }}
            onSearch={(searchTerm) => {
              setOrgSearchTerm(searchTerm);
            }}
            orgs={filteredOrgs}
          />
        );
      case "pickOrgRepos":
        return (
          <SelectOrgReposStep
            repositories={repositories}
            // @ts-expect-error - once you get to this point, organization is guaranteed to be defined
            organization={organization}
            onToggleRepo={onToggleRepo}
            onToggleAllRepos={onToggleAllRepos}
            isLoading={isLoadingOrgRepos}
            hasError={isOrgReposError}
          />
        );

      default:
        return null;
    }
  };

  const trackedRepos = new Map(currentTrackedRepositories);

  trackedRepos.forEach((isSelected, repo, map) => {
    if (!isSelected) {
      map.delete(repo);
    }
  });

  return (
    <TrackedRepoWizardLayout
      onAddToTrackingList={() => {
        removePastedInput();
        onAddToTrackingList(currentTrackedRepositories);
      }}
      trackedReposCount={trackedRepos.size}
      onCancel={() => {
        goBack();
      }}
      onCloseModal={onCloseModal}
    >
      {renderStep(step)}
    </TrackedRepoWizardLayout>
  );
};
