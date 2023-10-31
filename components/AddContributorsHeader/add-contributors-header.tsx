import { FaPlus } from "react-icons/fa";

import clsx from "clsx";

import { useEffect, useState } from "react";

import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import SingleSelect from "components/atoms/Select/single-select";
import Button from "components/atoms/Button/button";
import Search from "components/atoms/Search/search";
import useDebounceTerm from "lib/hooks/useDebounceTerm";

interface AddContributorsHeaderProps {
  timezoneOptions: { label: string; value: string }[];
  timezone?: string;
  setTimezoneFilter: (timezone: string) => void;
  selectedContributorsIds: number[];
  list: DbUserList;
  onAddToList?: () => void;
  loading?: boolean;
  onSearch: (searchTerm: string | undefined) => void;
  searchResults?: DbUser[];
}

const AddContributorsHeader = ({
  selectedContributorsIds,
  list,
  onAddToList,
  loading,
  timezone,
  setTimezoneFilter,
  timezoneOptions,
  onSearch,
}: AddContributorsHeaderProps): JSX.Element => {
  const [contributorSearch, setContributorSearch] = useState("");
  const debouncedSearchTerm = useDebounceTerm(contributorSearch, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative flex flex-col justify-between w-full gap-6 py-2">
      <div className="flex flex-col justify-between items-center w-full md:flex-row">
        <h1 className="self-start text-2xl flex items-center">
          <Link
            className="inline-block p-3 mr-2 border rounded-lg cursor-pointer bg-light-slate-1"
            href={`/lists/${list.id}/edit`}
          >
            <MdOutlineArrowBackIos title="Go To Insight Page" className="text-lg text-light-slate-10" />
          </Link>
          {list.name}
        </h1>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row header-info max-sm:mt-4">
          <div className="flex items-center order-2 gap-2 md:flex-row md:order-1">
            <span
              className={clsx(
                "w-max min-w-[1.4rem] h-6  p-3 text-sm items-center flex place-content-center rounded-full",
                selectedContributorsIds.length > 0 ? "bg-sauced-orange text-white" : "bg-light-slate-5 text-slate-400"
              )}
            >
              {selectedContributorsIds.length}
            </span>
            <p className="text-light-slate-9">Contributors</p>
          </div>
          <Button
            loading={loading}
            disabled={selectedContributorsIds.length === 0 || loading ? true : false}
            className={clsx(
              "bg-sauced-orange !text-white max-md:self-end order-1 md:order-2",
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
        <label className="flex w-full flex-col gap-4">
          Search for contributors to add to your list
          <Search
            placeholder="Search for new contributors"
            className="self- !w-full text-sm py-1.5"
            name={"contributors"}
            onChange={(value) => setContributorSearch(value)}
          />
        </label>
        <div className="flex items-center gap-4 self-auto md:self-end">
          <SingleSelect
            options={timezoneOptions}
            position="popper"
            value={timezone}
            placeholder="Select time zone"
            onValueChange={(value) => setTimezoneFilter(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddContributorsHeader;
