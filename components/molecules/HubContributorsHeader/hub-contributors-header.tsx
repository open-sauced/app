import { FaPlus } from "react-icons/fa";

import clsx from "clsx";
import { FiGlobe } from "react-icons/fi";

import { useEffect, useState } from "react";
import { useToast } from "lib/hooks/useToast";

import ListNameHeader from "components/atoms/ListNameHeader/list-name-header";
import LimitSelect from "components/atoms/Select/limit-select";
import SingleSelect from "components/atoms/Select/single-select";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Search from "components/atoms/Search/search";
import useDebounceTerm from "lib/hooks/useDebounceTerm";
// import Search from "components/atoms/Search/search";

interface ListHeaderProps {
  setLimit?: (limit: number) => void;
  timezoneOptions: { label: string; value: string }[];
  timezone?: string;
  setTimezoneFilter: (timezone: string) => void;
  isPublic: boolean;
  handleToggleIsPublic: () => void;
  selectedContributorsIds: number[];
  title?: string;
  onAddToList?: () => void;
  onTitleChange?: (title: string) => void;
  loading?: boolean;
  onSearch: (searchTerm: string | undefined) => void;
  searchResults?: DbUser[];
}

const HubContributorsHeader = ({
  setLimit,
  selectedContributorsIds,
  title,
  onAddToList,
  onTitleChange,
  loading,
  isPublic,
  handleToggleIsPublic,
  timezone,
  setTimezoneFilter,
  timezoneOptions,
  onSearch,
}: ListHeaderProps): JSX.Element => {
  const { toast } = useToast();

  const [contributorSearch, setContributorSearch] = useState("");
  const debouncedSearchTerm = useDebounceTerm(contributorSearch, 300);

  useEffect(() => {
    onSearch(contributorSearch);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative flex flex-col justify-between w-full gap-6 py-2">
      <div className="flex flex-col justify-between w-full md:flex-row">
        <div className="header-image mr-2  min-w-[130px] gap-3 flex flex-col">
          <ListNameHeader
            title={title}
            onEditTitle={(title) => {
              onTitleChange?.(title);
            }}
          />
          <Text className="text-light-slate-9">Select contributors to add to your list</Text>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row header-info max-sm:mt-4">
          <div className="flex items-center order-2 gap-2 md:flex-row md:order-1">
            <div className="flex items-center gap-10 py-1.5 px-4 rounded-md bg-white mr-3">
              <span className="flex items-center gap-2 text-sm shrink-0" id="hub-make-public">
                <FiGlobe /> Make Public
              </span>
              <ToggleSwitch
                ariaLabelledBy="hub-make-public"
                size="base"
                checked={isPublic}
                name="isPublic"
                handleToggle={handleToggleIsPublic}
              />
            </div>
            <span
              className={clsx(
                "w-max min-w-[1.4rem] h-6  p-3 text-sm items-center flex place-content-center rounded-full",
                selectedContributorsIds.length > 0 ? "bg-sauced-orange text-white" : "bg-light-slate-5 text-slate-400"
              )}
            >
              {selectedContributorsIds.length}
            </span>
            <p className="text-light-slate-9">Selected</p>
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
            Create List <FaPlus className="ml-2 text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 md:flex-row">
        <div className="flex w-full">
          <Search
            placeholder={`Search ${title}`}
            className="!w-full text-sm py-1.5"
            name={"contributors"}
            onChange={(value) => setContributorSearch(value)}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <SingleSelect
            options={timezoneOptions}
            position="popper"
            value={timezone}
            placeholder="Select time zone"
            onValueChange={(value) => setTimezoneFilter(value)}
          />
        </div>
        <div className="flex flex-col gap-2 md:items-center md:gap-4 md:flex-row">
          <LimitSelect
            placeholder="10 per page"
            options={[
              { name: "10 per page", value: "10" },
              { name: "20 per page", value: "20" },
              { name: "30 per page", value: "30" },
              { name: "40 per page", value: "40" },
              { name: "50 per page", value: "50" },
            ]}
            className="!w-36 overflow-x-hidden"
            onChange={(limit: string): void => {
              setLimit?.(Number(limit));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HubContributorsHeader;
