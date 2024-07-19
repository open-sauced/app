import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import TabListItem from "./tab-list-item";

type TabItem = {
  name: string;
  path: string;
};

interface TabListProps {
  tabList: TabItem[];
  selectedTab: string;
  pageId?: string;
}

interface SubTabsListProps extends TabListProps {
  label: string;
  textSize?: "small" | "regular";
  onSelect?: (tab: TabItem) => void;
}

const TabList = ({ tabList, pageId, selectedTab }: TabListProps) => {
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range) : 30;
  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
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
          <TabListItem
            tab={tab}
            pageLink={`${pageId ? `${pageId}/` : ""}${tab.path}?range=${range}`}
            selectedTab={selectedTab}
          />
        </div>
      ))}
    </nav>
  );
};

export const SubTabsList = ({ tabList, pageId, selectedTab, label, textSize, onSelect }: SubTabsListProps) => {
  return (
    <nav
      role="tablist"
      aria-label={label}
      className={clsx(
        "flex items-center w-max overflow-x-auto overflow-y-hidden gap-2 bg-light-slate-3 p-1 rounded",
        textSize === "small" && "text-sm"
      )}
    >
      {tabList.map((tab, index) => {
        const isSelected = selectedTab === tab.name.toLowerCase();

        return (
          <div
            role="tab"
            aria-selected={isSelected ? "true" : "false"}
            data-state={isSelected ? "active" : "inactive"}
            key={index}
            className={clsx(isSelected && "bg-white shadow", "rounded py-1 px-2", !isSelected && "text-light-slate-11")}
            onClick={onSelect ? () => onSelect(tab) : undefined}
          >
            {onSelect ? tab.name : <Link href={`${pageId ? `${pageId}/` : ""}${tab.path}`}>{tab.name}</Link>}
          </div>
        );
      })}
    </nav>
  );
};

export default TabList;
