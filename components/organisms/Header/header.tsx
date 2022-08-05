import React from "react";
import { useRouter } from "next/router";
import Text from "../../atoms/Typography/text";
import Title from "../../atoms/Typography/title";
import ContextThumbnail from "../../atoms/ContextThumbnail/context-thumbnail";
import FilterCard from "../../atoms/FilterCard/filter-card";
import Thumbnail from "../../../public/hacktoberfest-icon.png";
import PillSelector from "components/atoms/PillSelector/pill-selector";
import useFilterOptions from "lib/hooks/useFilterOptions";

const Header: React.FC = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();

  const { filterName, toolName, selectedFilter } = router.query;

  const filterBtnRouting = (filter: string) => {
    router.push(`/${filterName}/${toolName}/filter/${filter.toLocaleLowerCase()}`);
  };

  const cancelFilterRouting = () => {
    router.push(`/${filterName}/${toolName}`);
  };

  return (
    <section className="header flex flex-col md:flex-row pt-6 px-4 md:px-16 bg-slate-50">
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail 
          size={120} ContextThumbnailURL={Thumbnail.src}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">Hacktoberfest 2022</Title>
        <Text className="mt-1 !text-base font-medium text-slate-500">Open source projects and samples for Microsoft.</Text>
        <div className="flex mt-4 items-center gap-2">
          <FilterCard filterName="hacktoberfest" isRemovable={false} icon="topic" />
          <PillSelector
            pillOptions={filterOptions}
            handlePillClick={filterBtnRouting}
            handleCancelClick={cancelFilterRouting}
            selected={selectedFilter as string}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;