import { useRouter } from "next/router";

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

const HeaderFilter = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();
  const topicOptions = getInterestOptions();

  const { filterValues } = useFilterPrefetch();
  const { filterName, toolName, selectedFilter } = router.query;
  const filterBtnRouting = (filter: string) => {
    captureAnayltics("Filters", "toolsFilter", `${filter} applied`);
    router.push(`/${filterName}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    router.push(`/${filterName}/${toolName}`);
  };

  const topicRouting = (topic: string) => {
    router.push(`/${topic}/${toolName}${selectedFilter ? `/filter/${selectedFilter}` : ""}`);
  };

  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px] ">
        <ContextThumbnail size={120} ContextThumbnailURL={getTopicThumbnail(filterName as interestsType)}></ContextThumbnail>
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
            options={topicOptions}
            icon="topic"
            handleFilterClick={topicRouting}
          />
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
