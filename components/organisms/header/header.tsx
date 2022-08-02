import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Text from "../../atoms/Typography/text";
import Title from "../../atoms/Typography/title";
import ContextThumbnail from "../../atoms/ContextThumbnail/context-thumbnail";
import FilterCard from "../../atoms/FilterCard/filter-card";
import Thumbnail from "../../../public/hacktoberfest-icon.png";
import splitQuery from "lib/utils/split-query";
import { useGlobalStateContext } from "context/global-state";

const Header: React.FC = () => {
  const router = useRouter();
  const { appState, setAppState } = useGlobalStateContext();

  const { filter } = router.query;
  
  useEffect(() => {
    let filterArray: string[] | null = null;
    if( filter ) filterArray = splitQuery(filter as string);
    
    setAppState(prevState => {
      return {
        ...prevState,
        filter: filterArray
      };
    });
  }, [filter]);


  return (
    <header className="header flex flex-col md:flex-row pt-6 px-4 md:px-16 bg-slate-50">
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <ContextThumbnail 
          size={120} ContextThumbnailURL={Thumbnail.src}></ContextThumbnail>
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">Hacktoberfest 2022{appState.filter && ` - Filters:${appState.filter.map((filter: any) => ` ${filter}`)}`}</Title>
        <Text className="mt-1 !text-base font-medium text-slate-500">Open source projects and samples for Microsoft.</Text>
        <div className="flex mt-4">
          <FilterCard filterName="hacktoberfest" isRemovable={false} icon="topic" />
          {appState.filter && appState.filter.map((filter: string, index: number) => <FilterCard key={index} filterName={filter} bgColor="white"/>)}
        </div>
      </div>
    </header>
  );
};

export default Header;