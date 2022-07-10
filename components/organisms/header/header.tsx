import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Text from "../../atoms/Typography/text";
import Title from "../../atoms/Typography/title";
import FilterCard from "../../molecules/FilterCard/filter-card";

const Header: React.FC = () => {
  const router = useRouter();

  const { filterorg } = router.query;

  return (
    <header className="header flex flex-row pt-[24px] px-[64px] bg-slate-50">
      <div className="header-image mr-2 p-2 min-w-[130px]">
        <Image
          alt="Portal Logo"
          src="/hacktoberfest-icon.png"
          height={114}
          width={114}
          layout={"responsive"}
        />
      </div>
      <div className="header-info flex flex-col grow justify-center p-2">
        <Title level={1} className="!text-3xl font-semibold tracking-tight text-slate-900">Hacktoberfest 2022</Title>
        <Text className="mt-1 !text-base font-medium text-slate-500">Open source projects and samples for Microsoft.</Text> {/* Find out what this means */}
        <div className="flex mt-4">
          <FilterCard filterName="hacktoberfest" isRemovable={false} icon="topic" />
          {filterorg && <FilterCard filterName={filterorg as string} bgColor="white"/>}
        </div>
      </div>
    </header>
  );
};

export default Header;