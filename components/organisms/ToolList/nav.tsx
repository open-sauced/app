import React from "react";
import Link from "next/link";
import humanizeNumber from "../../../lib/utils/humanizeNumber";

type toolListArray = {
  name: string;
  numOf?: number;
};

interface NavProps {
  toolList: toolListArray[];
  selectedTool: string | string[] | undefined;
  filterName: string | string[] | undefined;
  selectedFilter?: string | string[] | undefined;
  username?: string | string[] | undefined;
}

const Nav: React.FC<NavProps> = ({ toolList, selectedTool = "dashboard", selectedFilter, filterName, username }) => {
  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex w-full overflow-x-auto overflow-y-hidden gap-2 px-4 md:px-16 bg-light-slate-3 border-b pt-3"
    >
      {toolList.map((tool, index) => (
        <div
          role="tab"
          aria-selected={selectedTool === tool.name.toLowerCase() ? "true" : "false"}
          data-state={selectedTool === tool.name.toLowerCase() ? "active" : "inactive"}
          tabIndex={-1}
          key={index}
          className={`tool-list-item border-b-2 transition-all ease-in-out ${
            selectedTool === tool.name.toLowerCase()
              ? "border-orange-500"
              : "border-transparent hover:border-light-slate-8"
          }`}
        >
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
              {(!!tool.numOf || tool.numOf === 0) && (
                <div className="ml-2 py-0.5 px-1.5 h-fit bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                  {humanizeNumber(tool.numOf, null)}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
