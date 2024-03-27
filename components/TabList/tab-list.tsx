import React from "react";

import TabListItem from "./tab-list-item";

type TabItem = {
  name: string;
  path: string;
  numOf?: number;
};

interface NavProps {
  tabList: TabItem[];
  selectedTab: string;
  pageId?: string;
}

const TabList: React.FC<NavProps> = ({ tabList, pageId, selectedTab }) => {
  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex w-full overflow-x-auto overflow-y-hidden gap-2"
    >
      {tabList.map((tab, index) => (
        <div
          role="tab"
          aria-selected={selectedTab === tab.name.toLowerCase() ? "true" : "false"}
          data-state={selectedTab === tab.name.toLowerCase() ? "active" : "inactive"}
          tabIndex={-1}
          key={index}
          className={`tool-list-item border-b-2 transition-all ease-in-out ${
            selectedTab === tab.name.toLowerCase()
              ? "border-orange-500"
              : "border-transparent hover:border-light-slate-8"
          }`}
        >
          <TabListItem tab={tab} pageLink={`${pageId ? `${pageId}/` : ""}${tab.path}`} selectedTab={selectedTab} />
        </div>
      ))}
    </nav>
  );
};

export default TabList;
