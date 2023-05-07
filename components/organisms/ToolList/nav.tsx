import React from "react";
import NavItem from "./nav-item";

type toolListArray = {
  name: string;
  numOf?: number;
};

interface NavProps {
  toolList: toolListArray[];
  selectedTool: string | string[] | undefined;
  filterName?: string | string[] | undefined;
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
      className="tool-list-nav flex w-full overflow-x-auto overflow-y-hidden gap-2 px-4 md:px-16 bg-light-slate-3 border-b pt-3 dark:bg-dark-slate-3 dark:border-b-dark-slate-8"
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
              : "border-transparent hover:border-light-slate-8 dark:hover:border-dark-slate-10"
          }`}
        >
          <NavItem
            tool={tool}
            selectedFilter={selectedFilter}
            filterName={filterName}
            username={username}
            selectedTool={selectedTool}
          />
        </div>
      ))}
    </nav>
  );
};

export default Nav;
