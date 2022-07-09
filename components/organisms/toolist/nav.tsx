import React from "react";
import Link from "next/link";
import useNav from "./hooks/useNav";
import { Button } from "@supabase/ui";

const Nav: React.FC = () => {

  const { toolList, navbarTool, portalName } = useNav();

  return (
    <nav 
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex flex-row gap-2 px-16 bg-slate-50 border-b pt-3">
      
      {toolList.map((tool, index) => 
        <div
          role="tab"
          aria-selected={navbarTool === tool.name ? "true" : "false"}
          data-state={navbarTool === tool.name ? "active" : "inactive"}
          tabIndex={-1}
          key={index} className={`nav-tool-item ${navbarTool === tool.name ? "" : ""}`}
          >
          <Link
            href={tool.name === "nextjs" ?
              `${portalName}` :
              `${portalName}?tool=${tool.name}`
            }
          >
            <Button size="xlarge" type="text" className={`!px-4 hover:!bg-slate-100 after:block after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-lg ${navbarTool === tool.name ? "after:bg-orange-500" : "focus:after:bg-slate-400"} focus:bg-slate-100 focus:ring-slate-300 child:flex child:items-center`}>
              <span className={"text-base whitespace-nowrap " + (navbarTool === tool.name ? "text-slate-900" : "text-slate-500")}>
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