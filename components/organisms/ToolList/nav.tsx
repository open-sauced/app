import React from "react";
import Link from "next/link";

type toolListArray = {
  name: string;
  numOf?: number;
}

interface NavProps {
  toolList: toolListArray[];
  selectedTool: string | string[] | undefined;
  filterName: string | string[] | undefined;
  selectedFilter?: string | string[] | undefined;
}

const Nav: React.FC<NavProps> = ({ toolList, selectedTool = "dashboard", selectedFilter, filterName }) => {

  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex w-[100vw] 2xl:w-full overflow-x-auto overflow-y-hidden gap-2 px-4 md:px-16 bg-slate-50 border-b pt-3">

      {toolList.map((tool, index) =>
        <div
          role="tab"
          aria-selected={selectedTool === tool.name.toLowerCase() ? "true" : "false"}
          data-state={selectedTool === tool.name.toLowerCase() ? "active" : "inactive"}
          tabIndex={-1}
          key={index} className={`tool-list-item ${selectedTool === tool.name.toLowerCase() ? "" : ""}`}>
          <Link href={`/${filterName}/${tool.name.toLowerCase()}${selectedFilter ? `/filter/${selectedFilter}` : ""}`} >
            {/* Button component was here and needed to be removed to resolve issue #187. Button component had styling that will eventually need to be replaced. */}
            <div className={`flex pb-1t px-2 md:px-4 hover:!bg-slate-100 after:block after:relative after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-lg ${selectedTool === tool.name.toLowerCase() ? "after:bg-orange-500" : "focus:after:bg-slate-400"} focus:bg-slate-100 focus:ring-slate-300 child:flex child:items-center`}>
              <span className={"text-base whitespace-nowrap " + (selectedTool === tool.name.toLowerCase() ? "text-slate-900" : "text-slate-500")}>
                {tool.name}
              </span>
              {
                tool.numOf &&
                  <div className="ml-2 py-0.5 px-1.5 bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                    {tool.numOf}
                  </div>
              }
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
