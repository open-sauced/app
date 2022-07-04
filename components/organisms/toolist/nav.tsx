import React from "react";
import Link from "next/link";
import useNav from "./hooks/useNav";
import { Button } from "@supabase/ui";

const Nav: React.FC = () => {

  const { toolList, navbarTool, portalName } = useNav();

  return (
    <nav className="tool-list-nav min-h-[50px] bg-[#F1F3F5] border-b">
      <div className="px-[64px] flex flex-row">
        {toolList.map((tool, index) => 
          <div 
          key={index} className={`nav-tool-item ${navbarTool === tool.name ? "border-b-2 border-[#FFA01C]" : ""}`}>
            <Link
              href={tool.name === "nextjs" ?
                `${portalName}` :
                `${portalName}?tool=${tool.name}`
              }
            >
              <Button size="xlarge" type="text" disabled={navbarTool === tool.name}>
                <h5 className={navbarTool === tool.name ? "text-black" : ""}>
                {tool.name}
                </h5>
                {
                  tool.numOf && 
                    <div className="ml-2 px-[3px] py-[2px] bg-[#DFE3E6] border rounded-lg">
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