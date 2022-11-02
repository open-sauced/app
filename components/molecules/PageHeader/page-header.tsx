import Title from "components/atoms/Typography/title";
import React from "react";
interface PageHeaderProps {
  title: string;
  rightComponent: React.ReactNode;
  leftComponent: React.ReactNode;
}

const PageHeader = ({ title, rightComponent, leftComponent }: PageHeaderProps): JSX.Element => {
  return (
    <div className="w-full flex md:flex-row flex-col  bg-light-orange-2  gap-x-3 items-start  md:items-end  pt-6 pb-4">
      <Title className="md:!text-2xl   !tracking-tight !text-xl" level={1}>
        {title}
      </Title>
      <div className="flex md:flex-row flex-col w-full md:justify-between items-start md:items-center">
        <div>{leftComponent}</div>
        <div>{rightComponent}</div>
      </div>
    </div>
  );
};

export default PageHeader;
