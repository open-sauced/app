import { FaPlus } from "react-icons/fa";

import clsx from "clsx";
import { FiGlobe } from "react-icons/fi";
import Button from "@components/atoms/Button/button";
import Text from "@components/atoms/Typography/text";

import { useToast } from "@lib/hooks/useToast";
import ListNameHeader from "@components/atoms/ListNameHeader/list-name-header";
import LimitSelect from "@components/atoms/Select/limit-select";
// import Search from '@components/atoms/Search/search';;
import ToggleSwitch from "@components/atoms/ToggleSwitch/toggle-switch";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";

interface ListHeaderProps {
  setLimit?: (limit: number) => void;
  setRangeFilter?: (range: number) => void;
  isPublic: boolean;
  handleToggleIsPublic: () => void;
  range?: number;
  selectedContributorsIds: number[];
  title?: string;
  onAddToList?: () => void;
  onTitleChange?: (title: string) => void;
  loading?: boolean;
}

const HubContributorsHeader = ({
  setLimit,
  setRangeFilter,
  selectedContributorsIds,
  title,
  onAddToList,
  onTitleChange,
  range,
  loading,
  isPublic,
  handleToggleIsPublic,
}: ListHeaderProps): JSX.Element => {
  const { toast } = useToast();

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
              <span className="flex items-center gap-2 text-sm">
                <FiGlobe /> Make Public
              </span>
              <ToggleSwitch size="base" checked={isPublic} name="isPublic" handleToggle={handleToggleIsPublic} />
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
            Add to List <FaPlus className="ml-2 text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4"></div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* <div className="w-58">
            <Search placeholder="Search for usernames" className="max-w-full" name={"query"} />
          </div> */}
          <ComponentDateFilter setRangeFilter={(range: number) => setRangeFilter?.(range)} defaultRange={range} />
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
