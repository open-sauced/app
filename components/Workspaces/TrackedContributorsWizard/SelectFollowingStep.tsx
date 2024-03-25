import { useEffect, useState } from "react";
import { useFetchGithubFollowing } from "lib/hooks/useFetchGithubFollowing";
import useStore from "../../../lib/store";
import { SearchedContributorsTable } from "../SearchedContributorsTable";

interface SelectFollowingStepProps {
  onToggleContributor: (contributor: string, isSelected: boolean) => void;
  onToggleAllContributors: (checked: boolean) => void;
  contributors: Map<string, boolean>;
}

export const SelectFollowingStep = ({
  onToggleContributor,
  onToggleAllContributors,
  contributors,
}: SelectFollowingStepProps) => {
  const username: string | null = useStore((state) => state.user?.user_metadata.user_name);
  const { data: followingList, error } = useFetchGithubFollowing({ username: username! });
  const [filteredContributors, setFilteredContributors] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    setFilteredContributors(contributors);
  }, [contributors]);

  useEffect(() => {
    followingList?.map((follow) => {
      onToggleContributor(follow.login, true);
    });
  }, [followingList]);

  const onFilterContributors = (search: string) => {
    const updates = new Map();

    for (const [contributor, selected] of filteredContributors) {
      if (contributor.includes(search)) {
        updates.set(contributor, selected);
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
