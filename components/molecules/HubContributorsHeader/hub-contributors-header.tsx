import { FaPlus } from "react-icons/fa";

import clsx from "clsx";
import { FiGlobe } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { useToast } from "lib/hooks/useToast";

import { Dialog, Content, Overlay, Portal } from "@radix-ui/react-dialog";
import ListNameHeader from "components/atoms/ListNameHeader/list-name-header";
import LimitSelect from "components/atoms/Select/limit-select";
import SingleSelect from "components/atoms/Select/single-select";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import Button from "components/atoms/Button/button";
import Text from "components/atoms/Typography/text";
import Search from "components/atoms/Search/search";
import useDebounceTerm from "lib/hooks/useDebounceTerm";
import { setQueryParams } from "lib/utils/query-params";
import { QueryParams } from "pages/hub/lists/find";
import Title from "components/atoms/Typography/title";
import TextInput from "components/atoms/TextInput/text-input";
import { DialogTrigger } from "../Dialog/dialog";

// import Search from "components/atoms/Search/search";

interface ListHeaderProps {
  timezoneOptions: { label: string; value: string }[];
  handleOpenFilterPanel?: () => void;
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
  selectedContributorsIds,
  title,
  onAddToList,
  onTitleChange,
  loading,
  isPublic,
  handleToggleIsPublic,
  timezoneOptions,
  onSearch,
}: ListHeaderProps): JSX.Element => {
  // const { toast } = useToast();
  const router = useRouter();
  const filterCount = router.asPath
    .split("?")[1]
    ?.split("&")
    .filter((filter) => filter.includes("tz") || filter.includes("pr_velocity")).length;
  const { limit, tz, pr_velocity } = router.query as QueryParams;
  const [filterOpen, setFilterOpen] = useState(false);
  const [prVelocity, setPrVelocity] = useState(pr_velocity ?? "");

  const [contributorSearch, setContributorSearch] = useState("");
  const debouncedSearchTerm = useDebounceTerm(contributorSearch, 300);

  useEffect(() => {
    if (prVelocity) {
      setQueryParams({ pr_velocity: prVelocity } as QueryParams);
      // console.log(prVelocity);
    }
  }, [prVelocity, router.query]);
  useEffect(() => {
    onSearch(contributorSearch);
  }, [debouncedSearchTerm]);

  return (
    <Dialog open={filterOpen} onOpenChange={(value) => setFilterOpen(value)}>
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
                <span className="flex items-center gap-2 text-sm shrink-0">
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
        <div className="flex flex-col w-full gap-2 justify-between md:flex-row">
          <div className="flex items-center gap-4 ">
            <Search
              placeholder={`Search ${title}`}
              className=" text-sm py-1.5"
              name={"contributors"}
              onChange={(value) => setContributorSearch(value)}
            />
            <DialogTrigger className="px-2 py-1.5 text-sm bg-white border rounded-md shrink-0 flex items-center gap-2 ">
              All filters
              {filterCount && filterCount > 0 ? (
                <span className="px-1.5  text-white text-xs rounded-lg bg-sauced-orange">{filterCount}</span>
              ) : (
                <BiFilterAlt className="text-lg text-black/80" />
              )}
            </DialogTrigger>
          </div>
          <div className="flex flex-col gap-2 md:items-center md:gap-4 md:flex-row">
            <SingleSelect
              options={timezoneOptions}
              position="popper"
              className="opacity-100 text-light-slate-12"
              value={tz ? String(tz) : undefined}
              placeholder="Select time zone"
              onValueChange={(value) => {
                setQueryParams({ tz: value } as QueryParams);
              }}
            />
            <LimitSelect
              placeholder="page limit"
              options={[
                { name: "10 per page", value: "10" },
                { name: "20 per page", value: "20" },
                { name: "30 per page", value: "30" },
                { name: "40 per page", value: "40" },
                { name: "50 per page", value: "50" },
              ]}
              selected={limit as string}
              className="!w-36 overflow-x-hidden"
              onChange={(limit: string): void => {
                setQueryParams({ limit: String(limit) } as QueryParams);
              }}
            />
          </div>
        </div>
      </div>
      <Portal className="justify-end">
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <Overlay className="fixed inset-0 z-10 bg-black/10 backdrop-blur-xs transition-all duration-100 data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
          <Content className="fixed z-50 px-2 md:px-6 py-10 shadow-lg grid w-full bg-white md:w-80 h-[calc(100%-(3.3rem))]">
            <div className="flex gap-5 flex-col">
              <Title level={2}>All Filters</Title>
              <div className="flex flex-col gap-2">
                <Title level={4}>Timezone</Title>
                <SingleSelect
                  options={timezoneOptions}
                  position="popper"
                  className="opacity-100 text-light-slate-12"
                  value={tz ? String(tz) : undefined}
                  placeholder="Select time zone"
                  onValueChange={(value) => {
                    setQueryParams({ tz: value } as QueryParams);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Title level={4}>PR Velocity</Title>
                <TextInput value={""} onChange={() => {}} />
              </div>
            </div>
          </Content>
        </div>
      </Portal>
    </Dialog>
  );
};

export default HubContributorsHeader;
