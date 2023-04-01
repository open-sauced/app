import Link from "next/link";
import { useEffect, useState } from "react";

import humanizeNumber from "lib/utils/humanizeNumber";

interface NavItemProps {
  username?: string | string[] | undefined;
  filterName?: string | string[] | undefined;
  tool: { name: string, numOf?: number};
  selectedFilter?: string | string[] | undefined;
  selectedTool: string | string[];
}

const NavItem:  React.FC<NavItemProps> = ({ username, filterName, tool, selectedFilter, selectedTool }) => {
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    setTotal(tool.numOf);
  }, [tool.numOf]);

  return (
    <Link
      href={`/${username ? `pages/${username}/` : ""}${filterName}/${tool.name.toLowerCase()}${
        selectedFilter
          ? `/filter/${Array.isArray(selectedFilter) ? selectedFilter.join("/") : selectedFilter}`
          : ""
      }`}>
      {/* Button component was here and needed to be removed to resolve issue #187. Button component had styling that will eventually need to be replaced. */}
      <div
        className={`flex h-11 px-2 md:px-4 items-center rounded-t-lg ${
          selectedTool === tool.name.toLowerCase() ? "" : "cursor-pointer hover:!bg-light-slate-4"
        } after:block after:relative after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-lg ${
          selectedTool === tool.name.toLowerCase() ? "after:bg-orange-500" : "focus:after:bg-slate-400"
        } focus:bg-slate-100 focus:ring-slate-300 child:flex child:items-center`}
      >
        <span
          className={
            "text-base whitespace-nowrap " +
          (selectedTool === tool.name.toLowerCase() ? "text-slate-900" : "text-slate-500")
          }
        >
          {tool.name}
        </span>
        {total !== undefined && <div className={"ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold"}>
          { humanizeNumber(total, null) }
        </div>}
      </div>
    </Link>    
  );
};

export default NavItem;