import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";
import SuperativeSelector from "components/molecules/SuperlativeSelector/superlative-selector";

import useFilterOptions from "lib/hooks/useFilterOptions";
import { captureAnayltics } from "lib/utils/analytics";
import useFilterPrefetch from "lib/hooks/useFilterPrefetch";
import topicNameFormatting from "lib/utils/topic-name-formatting";
import FilterCardSelect from "components/molecules/FilterCardSelect/filter-card-select";
import getTopicThumbnail from "lib/utils/getTopicThumbnail";
import { interestsType } from "lib/utils/getInterestOptions";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import Search from "components/atoms/Search/search";

const HeaderFilter = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();
  const topicOptions = getInterestOptions();

  const { filterValues } = useFilterPrefetch();
  const { toolName, selectedFilter } = router.query;
  const [filterName, setFilterName] = useState<string | string[] | undefined>(router.query.filterName);

  const filterBtnRouting = (filter: string) => {
    captureAnayltics("Filters", "toolsFilter", `${filter} applied`);
    return router.push(`/${filterName}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    return router.push(`/${filterName}/${toolName}`);
  };

  const topicRouting = (topic: string) => {
    if (!topic) return;
    setFilterName(topic);
    router.push(`/${topic}/${toolName}${selectedFilter ? `/filter/${selectedFilter}` : ""}`);
  };

  useEffect(() => {
    // If filterName is null, get the value from the url
    setFilterName(document.location.pathname.split("/")[1] || router.query.filterName);
  }, [filterName, router.query.filterName]);

  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px] ">
        <ContextThumbnail
          size={120}
          ContextThumbnailURL={getTopicThumbnail(filterName as interestsType)}
        ></ContextThumbnail>
      </div>
      <div className="header-info md:truncate flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">
          {topicNameFormatting(filterName as string)}
        </Title>
        <Text className="mt-1 !text-base   text-slate-500">
          {`Insights on GitHub repositories using the ${topicNameFormatting(filterName as string)} topic.`}
        </Text>
        <div className="flex mt-4 items-center gap-2">
          <FilterCardSelect
            selected={filterName as string}
            options={topicOptions as unknown as []}
            icon="topic"
            handleFilterClick={topicRouting}
          />
          <span className="w-0.5 bg-slate-300 h-6"></span>
          <Search
            placeholder="Search topic"
            name="topic-search"
            value={filterName as string}
            autoFocus={false}
            className="text-base rounded-lg cursor-pointer h-8 border-slate-300 hover:bg-slate-50 focus:ring-1  focus:ring-slate-300 shadow-none max-w-40"
            onSearch={(value) => {
              topicRouting((value as string).toLocaleLowerCase());
            }}
            suggestions={[]}
            onChange={() => {}}
            isLoading={false}
          />
        </div>
        <div className="flex mt-4 items-center gap-2">
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
