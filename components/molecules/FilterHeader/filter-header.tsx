import { useRouter } from "next/router";

import Text from "components/atoms/Typography/text";
import Title from "components/atoms/Typography/title";
import ContextThumbnail from "components/atoms/ContextThumbnail/context-thumbnail";

import useFilterOptions from "lib/hooks/useFilterOptions";
import { captureAnalytics } from "lib/utils/analytics";
import useFilterPrefetch from "lib/hooks/useFilterPrefetch";
import topicNameFormatting from "lib/utils/topic-name-formatting";
import FilterCardSelect from "components/molecules/FilterCardSelect/filter-card-select";
import getTopicThumbnail from "lib/utils/getTopicThumbnail";
import { InterestType } from "lib/utils/getInterestOptions";
import { getInterestOptions } from "lib/utils/getInterestOptions";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";

const HeaderFilter = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();
  const topicOptions = getInterestOptions();

  const { filterValues } = useFilterPrefetch();
  const { pageId, toolName, selectedFilter } = router.query;
  const { user } = useSupabaseAuth();
  const { data: userInfo } = useFetchUser(user?.user_metadata.user_name);

  const filterBtnRouting = (filter: string) => {
    captureAnalytics({ title: "Filters", property: "toolsFilter", value: `${filter} applied`, userInfo });
    return router.push(`/explore/topic/${pageId}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    return router.push(`/explore/topic/${pageId}/${toolName}`);
  };

  const topicRouting = (topic: string) => {
    router.push(`/explore/topic/${topic}/${toolName}${selectedFilter ? `/filter/${selectedFilter}` : ""}`);
  };

  return (
    <>
      <div className="header-image mr-2 p-2 min-w-[130px] ">
        <ContextThumbnail size={120} ContextThumbnailURL={getTopicThumbnail(pageId as InterestType)}></ContextThumbnail>
      </div>
      <div className="header-info md:truncate flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold text-slate-900">
          {topicNameFormatting(pageId as string)}
        </Title>
        <Text className="mt-1 !text-base   text-slate-500">
          {`Insights on GitHub repositories using the ${topicNameFormatting(pageId as string)} topic.`}
        </Text>
        <div className="flex mt-4 items-center gap-2">
          <FilterCardSelect
            selected={pageId as string}
            options={topicOptions as unknown as []}
            icon="topic"
            handleFilterClick={topicRouting}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderFilter;
