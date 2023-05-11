import clsx from "clsx";
import React from "react";
import { TbFileText } from "react-icons/tb";

interface InsightsPageListItemProps extends React.ComponentProps<"div"> {
  pageName: string;
  pageId: string;
}
const InsightsPageListItem = ({ pageName, className, ...props }: InsightsPageListItemProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "flex items-center gap-3 p-1.5 transition-all text-sm rounded-md cursor-pointer hover:text-sauced-orange hover:bg-orange-100",
        className
      )}
    >
      <TbFileText className="text-2xl " />
      <span>{pageName}</span>
    </div>
  );
};

export default InsightsPageListItem;
