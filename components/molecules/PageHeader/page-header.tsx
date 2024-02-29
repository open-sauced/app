import React from "react";
import Title from "components/atoms/Typography/title";
interface PageHeaderProps {
  title: string;
  rightComponent: React.ReactNode;
  leftComponent: React.ReactNode;
}

const PageHeader = ({ title, rightComponent, leftComponent }: PageHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-col items-start w-full pt-6 pb-4 md:flex-row bg-light-orange-2 dark:bg-dark-orange-2 gap-x-3 md:items-end">
      <Title className="md:!text-2xl !text-xl" level={1}>
        {title}
      </Title>
      <div className="flex flex-col items-start w-full md:flex-row md:justify-between md:items-center">
        <div>{leftComponent}</div>
        <div>{rightComponent}</div>
      </div>
    </div>
  );
};

export default PageHeader;
