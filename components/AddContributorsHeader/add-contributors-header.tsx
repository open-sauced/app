import { FaPlus } from "react-icons/fa";

import clsx from "clsx";

import { useEffect, useState } from "react";

import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Button from "components/shared/Button/button";
import Search from "components/atoms/Search/search";
import useDebounceTerm from "lib/hooks/useDebounceTerm";

interface AddContributorsHeaderProps {
  selectedContributorsIds: number[];
  list: DbUserList;
  workspaceId?: string;
  onAddToList?: () => void;
  loading?: boolean;
  onSearch: (searchTerm: string | undefined) => void;
  searchSuggestions?: string[];
  onSearchSelect?: (username: string) => void;
}

const AddContributorsHeader = ({
  selectedContributorsIds,
  list,
  workspaceId,
  onAddToList,
  loading,
  onSearch,
  searchSuggestions,
  onSearchSelect,
}: AddContributorsHeaderProps): JSX.Element => {
  const [contributorSearch, setContributorSearch] = useState("");
  const debouncedSearchTerm = useDebounceTerm(contributorSearch, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative flex flex-col justify-between w-full gap-6 py-2">
      <div className="flex flex-col justify-between items-center w-full md:flex-row">
        <h1 className="self-start text-2xl flex items-center">
          <Link
            className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
            href={
              workspaceId ? `/workspaces/${workspaceId}/contributor-insights/${list.id}/edit` : `/lists/${list.id}/edit`
            }
          >
            <MdOutlineArrowBackIos title="Go To Insight Page" className="text-lg text-light-slate-10" />
          </Link>
          {list.name}
        </h1>
        <div className="flex justify-between gap-4 header-info max-sm:mt-4 w-full md:w-fit ">
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                "w-max min-w-[1.4rem] h-6  p-3 text-sm items-center flex place-content-center rounded-full",
                selectedContributorsIds.length > 0 ? "bg-sauced-orange text-white" : "bg-light-slate-5 text-slate-400"
              )}
            >
              {selectedContributorsIds.length}
            </span>
            <p className="text-light-slate-9">
              <span className="sr-only md:not-sr-only">Contributors</span> Selected
            </p>
          </div>
          <Button
            loading={loading}
            disabled={selectedContributorsIds.length === 0 || loading ? true : false}
            className={clsx(
              "bg-sauced-orange !text-white max-md:self-end",
              selectedContributorsIds.length === 0 && "!bg-slate-300 !text-slate-100"
            )}
            variant="text"
            onClick={onAddToList}
          >
            Add to List <FaPlus className="ml-2 text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 md:flex-row">
        <label htmlFor="search-contributors" className="flex w-full flex-col gap-4">
          <span className="sr-only">Search for contributors to add to your list</span>
          <Search
            id="search-contributors"
            placeholder={`Search for contributors to add to your list`}
            className="!w-full text-sm py-1.5"
            name={"contributors"}
            onChange={(value) => setContributorSearch(value)}
            suggestions={searchSuggestions}
            onSearch={onSearch}
            onSelect={onSearchSelect}
          />
        </label>
      </div>
    </div>
  );
};

export default AddContributorsHeader;
