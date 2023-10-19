import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";
import SuperativeSelector from "components/molecules/SuperlativeSelector/superlative-selector";

import topicNameFormatting from "lib/utils/topic-name-formatting";
import FilterCardSelect from "components/molecules/FilterCardSelect/filter-card-select";
import getTopicThumbnail from "lib/utils/getTopicThumbnail";
import { interestsType } from "lib/utils/getInterestOptions";
import { FilterValues } from "lib/hooks/useFilterPrefetch";

interface HeaderFilterProps {
  onFilterRouting: (filter: string) => void;
  onCancelFilterRouting: () => void;
  onTopicRouting: (topic: string) => void;
  filterName: string | string[] | undefined;
  topicOptions: string[];
  selectedFilter: string | string[] | undefined;
  filterOptions: string[];
  filterValues: FilterValues;
}

const HeaderFilter = ({
  onFilterRouting,
  onCancelFilterRouting,
  onTopicRouting,
  filterName,
  topicOptions,
  selectedFilter,
  filterOptions,
  filterValues,
}: HeaderFilterProps) => {
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
            handleFilterClick={onTopicRouting}
          />
          <SuperativeSelector
            filterOptions={filterOptions}
            filterValues={filterValues}
            handleFilterClick={onFilterRouting}
            handleCancelClick={onCancelFilterRouting}
            selected={Array.isArray(selectedFilter) ? selectedFilter.join("/") : selectedFilter}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderFilter;
