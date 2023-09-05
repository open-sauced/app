import Link from "next/link";
import { useEffect, useState } from "react";

import humanizeNumber from "lib/utils/humanizeNumber";

interface TabListItemProps {
  tab: { name: string; numOf?: number };
  pageLink: string;
  selectedTab: string;
}

const TabListItem: React.FC<TabListItemProps> = ({ tab, pageLink, selectedTab }) => {
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    setTotal(tab.numOf);
  }, [tab.numOf]);

  return (
    <Link href={pageLink}>
      <div
        className={`flex h-11 px-2 md:px-4 items-center rounded-t-lg ${
          selectedTab === tab.name.toLowerCase() ? "" : "cursor-pointer hover:!bg-light-slate-4"
        } after:block after:relative after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-lg ${
          selectedTab === tab.name.toLowerCase() ? "after:bg-orange-500" : "focus:after:bg-slate-400"
        } focus:bg-slate-100 focus:ring-slate-300 child:flex child:items-center`}
      >
        <span
          className={
            "text-base whitespace-nowrap " +
            (selectedTab === tab.name.toLowerCase() ? "text-slate-900" : "text-slate-500")
          }
        >
          {tab.name}
        </span>
        {total !== undefined && (
          <div
            className={"ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold"}
          >
            {humanizeNumber(total, null)}
          </div>
        )}
      </div>
    </Link>
  );
};

export default TabListItem;
