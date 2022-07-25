import React from "react";
import Link from "next/link";
import { Button } from "@supabase/ui";

type toolListArray = {
  name: string;
  numOf?: number;
}

interface NavProps {
  toolList: toolListArray[];
  selectedTool: string | string[] | undefined;
  filterName: string | string[] | undefined;
}

const Nav: React.FC<NavProps> = ({ toolList, selectedTool, filterName }) => {

  return (
    <nav 
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex w-full overflow-x-auto overflow-y-hidden gap-2 px-4 md:px-16 bg-slate-50 border-b pt-3">
      
      {toolList.map((tool, index) => 
        <div
          role="tab"
          aria-selected={selectedTool === tool.name ? "true" : "false"}
          data-state={selectedTool === tool.name ? "active" : "inactive"}
          tabIndex={-1}
          key={index} className={`tool-list-item ${selectedTool === tool.name ? "" : ""}`}>
          <Link
            href={tool.name === "Dashboard" ?
              `/${filterName}` :
              `/${filterName}/${tool.name.toLowerCase()}`
            }
          >
            <Button size="xlarge" type="text" className={`!px-2 md:!px-4  hover:!bg-slate-100 after:block after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-lg ${selectedTool === tool.name ? "after:bg-orange-500" : "focus:after:bg-slate-400"} focus:bg-slate-100 focus:ring-slate-300 child:flex child:items-center`}>
              <span className={"text-base whitespace-nowrap " + (selectedTool === tool.name ? "text-slate-900" : "text-slate-500")}>
                {tool.name}
              </span>
              {
                tool.numOf && 
                  <div className="ml-2 py-0.5 px-1.5 bg-slate-200 text-slate-500 border rounded-full text-xs font-semibold">
                    {tool.numOf}
                  </div>
              }
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;