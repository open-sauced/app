import { useRouter } from "next/router";

import Thumbnail from "../../../public/hacktoberfest-icon.png";

import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";
import FilterCard from "components/atoms/FilterCard/filter-card";
import SuperativeSelector from "components/molecules/SuperlativeSelector/superlative-selector";

import useFilterOptions from "lib/hooks/useFilterOptions";
import { captureAnayltics } from "lib/utils/analytics";
import useFilterPrefetch from "lib/hooks/useFilterPrefetch";
import uppercaseFirst from "lib/utils/uppercase-first";

const HeaderFilter = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();

  const { filterValues } = useFilterPrefetch();
  const { filterName, toolName, selectedFilter } = router.query;
  const isHacktoberfest = filterName === "hacktoberfest";
  const filterBtnRouting = (filter: string) => {
    captureAnayltics("Filters", "toolsFilter", `${filter} applied`);
    router.push(`/${filterName}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    router.push(`/${filterName}/${toolName}`);
  };  
  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail size={120} ContextThumbnailURL={isHacktoberfest ? Thumbnail.src : ""}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">
          {isHacktoberfest ? "Hacktoberfest 2022" : uppercaseFirst(filterName as string)}
        </Title>
        <Text className="mt-1 !text-base   text-slate-500">
          Insights on GitHub repositories{" "}
          {isHacktoberfest ? "opted into the largest open source hackathon." : `using the ${filterName} topic.`}
        </Text>
        <div className="flex mt-4 items-center relative  gap-2">
          <FilterCard filterName={filterName as string} isRemovable={false} icon="topic" />
          {/* <PillSelector
            pillOptions={filterOptions}
            handlePillClick={filterBtnRouting}
            handleCancelClick={cancelFilterRouting}
            selected={selectedFilter}
          /> */}
          <SuperativeSelector
            filterOptions={filterOptions}
            filterValues={filterValues}
            handleFilterClick={filterBtnRouting}
            handleCancelClick={cancelFilterRouting}
            selected={Array.isArray(selectedFilter) ? selectedFilter.join("/") : selectedFilter}
          />
        </div>
      </div>    
    </>
  );
};

export default HeaderFilter;