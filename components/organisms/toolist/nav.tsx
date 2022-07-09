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
        <Link
          href={tool.name === "nextjs" ?
            `${portalName}` :
            `${portalName}?tool=${tool.name}`
          }
          key={index} className={`nav-tool-item ${navbarTool === tool.name ? "border-b-2 border-slate-400" : ""}`}
        >
          <Button size="xlarge" type="text" className="!px-4 hover:!bg-slate-100">
            <span className={"text-base " + (navbarTool === tool.name ? "text-slate-900" : "text-slate-500")}>
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
      )}
    </nav>
  );
};

export default Nav;