import { useEffect, useState } from "react";
import { SearchedContributorsTable } from "../SearchedContributorsTable";

interface FilterPastedContributorsStepProps {
  onToggleContributor: (contributor: string, isSelected: boolean) => void;
  onToggleAllContributors: (checked: boolean) => void;
  contributors: Map<string, boolean>;
}

export const FilterPastedContributorsStep = ({
  onToggleContributor,
  onToggleAllContributors,
  contributors,
}: FilterPastedContributorsStepProps) => {
  const [filteredContributors, setFilteredContributors] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    setFilteredContributors(new Map(contributors));
  }, [contributors]);

  const onFilterContributors = (search: string) => {
    const updates = new Map();

    for (const [repo, selected] of contributors) {
      if (repo.includes(search)) {
        updates.set(repo, selected);
      }
    }

    setFilteredContributors(updates);
  };

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <SearchedContributorsTable
        type="by-contributors"
        contributors={filteredContributors}
        onFilter={onFilterContributors}
        onToggleContributor={onToggleContributor}
        onToggleAllContributors={onToggleAllContributors}
      />
    </div>
  );
};
