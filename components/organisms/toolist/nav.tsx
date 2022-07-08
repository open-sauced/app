import React from "react";
import Link from "next/link";
import useNav from "./hooks/useNav";
import { Button } from "@supabase/ui";

const Nav: React.FC = () => {

  const { toolList, navbarTool, portalName } = useNav();

  return (
    <nav className="tool-list-nav min-h-[50px] bg-slate-50 border-b pt-3">
      <div className="px-[64px] flex flex-row gap-2">
        {toolList.map((tool, index) => 
          <div 
            key={index} className={`nav-tool-item ${navbarTool === tool.name ? "border-b-2 border-[#FFA01C]" : ""}`}>
            <Link
              href={tool.name === "nextjs" ?
                `${portalName}` :
                `${portalName}?tool=${tool.name}`
              }
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;