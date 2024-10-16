import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useEffectOnce } from "react-use";
import Search from "components/atoms/Search/search";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { SearchedContributorsTable } from "../SearchedContributorsTable";

interface SearchByContributorsStepProps {
  onSelectContributor: (contributor: string) => void;
  onToggleContributor: (contributor: string, isSelected: boolean) => void;
  onToggleAllContributors: (checked: boolean) => void;
  onSearch: (search?: string) => void;
  contributors: Map<string, boolean>;
  searchedContributors: string[];
  suggestedContributors: string[];
}

const EmptyState = () => {
  return (
    <div className="grid place-content-center">
      <div className="text-center flex flex-col items-center p-24 gap-2 max-w-lg">
        <div className="p-3 border rounded-lg mb-2">
          <FaSearch size={24} className="text-light-slate-9" />
        </div>
        <span className="font-semibold">No contributors added yet!</span>
        <span>Use the search bar to find the contributors you want to track on your workspace.</span>
      </div>
    </div>
  );
};

export const SearchByContributorsStep = ({
  onSearch,
  onSelectContributor,
  onToggleContributor,
  onToggleAllContributors,
  contributors,
  searchedContributors,
  suggestedContributors = [],
}: SearchByContributorsStepProps) => {
  const [filteredContributors, setFilteredContributors] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    setFilteredContributors(new Map(contributors));
  }, [contributors]);

  const onFilterContributors = (search: string) => {
    const updates = new Map();

    for (const [contributor, selected] of contributors) {
      if (contributor.includes(search)) {
        updates.set(contributors, selected);
      }
    }

    setFilteredContributors(updates);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  // on load, put input focus on search bar
  useEffectOnce(() => {
    (formRef.current?.querySelector('[name="query"]') as HTMLInputElement)?.focus();
  });

  useEffect(() => {
    if (searchedContributors.length > 0) {
      setSearchIsLoading(false);
    }
  }, [searchedContributors]);

  return (
    <div className="flex flex-col gap-4 h-96 max-h-96">
      <form
        ref={formRef}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Search
          placeholder="Search contributors"
          labelText="Search contributors"
          className="w-full"
          isLoading={searchIsLoading}
          name="query"
          onChange={(event) => {
            setSearchIsLoading(true);
            onSearch(event);
          }}
          onSelect={onSelectContributor}
          suggestionsLabel={suggestedContributors.length > 0 ? "Suggested contributors" : undefined}
          suggestions={(suggestedContributors.length > 0 ? suggestedContributors : searchedContributors).map(
            (contributor) => {
              const [owner] = contributor.split("/");

              return {
                key: contributor,
                node: (
                  <div key={contributor} className="flex items-center gap-2">
                    <Avatar contributor={owner} size="xsmall" />
                    <span>{contributor}</span>
                  </div>
                ),
              };
            }
          )}
        />
      </form>
      {contributors.size === 0 ? (
        <EmptyState />
      ) : (
        <SearchedContributorsTable
          type="by-contributors"
          contributors={filteredContributors}
          onFilter={onFilterContributors}
          onToggleContributor={onToggleContributor}
          onToggleAllContributors={onToggleAllContributors}
        />
      )}
    </div>
  );
};
