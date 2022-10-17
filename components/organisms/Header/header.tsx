import React from "react";
import { useRouter } from "next/router";
import Text from "../../atoms/Typography/text";
import Title from "../../atoms/Typography/title";
import ContextThumbnail from "../../atoms/ContextThumbnail/context-thumbnail";
import FilterCard from "../../atoms/FilterCard/filter-card";
import Thumbnail from "../../../public/hacktoberfest-icon.png";
import SuperativeSelector from "components/molecules/SuperlativeSelector/superlative-selector";
import useFilterOptions from "lib/hooks/useFilterOptions";
import { captureAnayltics } from "lib/utils/analytics";
import useFilterPrefetch from "lib/hooks/useFilterPrefetch";
import uppercaseFirst from "lib/utils/uppercase-first";

const Header: React.FC = () => {
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
    <section className="header flex flex-col md:flex-row pt-6 px-4 md:px-16 bg-light-slate-3">
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail size={120} ContextThumbnailURL={isHacktoberfest ? Thumbnail.src : ""}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">
          { isHacktoberfest ? "Hacktoberfest 2022" : uppercaseFirst(filterName as string) }
        </Title>
        <Text className="mt-1 !text-base font-medium text-slate-500">
          Insights on GitHub repositories { isHacktoberfest ? "opted into the largest open source hackathon." : `using the ${filterName} topic.` }
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
    </section>
  );
};

export default Header;
