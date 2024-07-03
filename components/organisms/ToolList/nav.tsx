import React from "react";

import { useRouter } from "next/router";
import { setQueryParams } from "lib/utils/query-params";

import ComponentDateFilter from "components/molecules/ComponentDateFilter/component-date-filter";
import NavItem from "./nav-item";

type ToolListArray = {
  name: string;
  numOf?: number;
};

interface NavProps {
  toolList: ToolListArray[];
  selectedTool: string | string[] | undefined;
  filterName?: string | string[] | undefined;
  selectedFilter?: string | string[] | undefined;
  username?: string | string[] | undefined;
  workspaceId?: string;
}

const Nav: React.FC<NavProps> = ({
  toolList,
  selectedTool = "dashboard",
  selectedFilter,
  filterName,
  username,
  workspaceId,
}) => {
  const router = useRouter();
  const { range = 30, insightId } = router.query;

  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Browse the tools"
      tabIndex={0}
      className="tool-list-nav flex w-full overflow-x-auto overflow-y-hidden gap-2 border-b pt-3"
    >
      {toolList.map((tool, index) => {
        // TODO: Too much is going on here in terms of handling URLs. This should be revisited.
        const pageId = filterName || insightId;
        const workspaceNavLink = `/workspaces/${workspaceId}/repository-insights/${pageId}/${tool.name.toLowerCase()}`;

        let pageNavLink = "/";

        if (username) {
          pageNavLink += `pages/${username}/explore/topic/`;
        } else {
          pageNavLink += "explore/topic/";
        }
        pageNavLink += `${pageId}/${tool.name.toLowerCase()}`;

        if (selectedFilter) {
          if (Array.isArray(selectedFilter)) {
            pageNavLink += `/filter/${selectedFilter.join("/")}?range=${range}`;
          } else {
            pageNavLink += `/filter/${selectedFilter}?range=${range}`;
          }
        }

        const navLink = workspaceId ? workspaceNavLink : pageNavLink;

        return (
          <div
            role="tab"
            aria-selected={selectedTool === tool.name.toLowerCase() ? "true" : "false"}
            data-state={selectedTool === tool.name.toLowerCase() ? "active" : "inactive"}
            tabIndex={-1}
            key={index}
            className={`tool-list-item border-b-2 transition-all ease-in-out ${
              (selectedTool as string).toLowerCase() === tool.name.toLowerCase()
                ? "border-orange-500"
                : "border-transparent hover:border-light-slate-8"
            }`}
          >
            <NavItem
              tool={tool}
              selectedFilter={selectedFilter}
              filterName={pageId}
              username={username}
              selectedTool={selectedTool}
              navLink={navLink}
            />
          </div>
        );
      })}
      <div className="ml-auto hidden md:block">
        <ComponentDateFilter
          setRangeFilter={(selectedRange) => {
            setQueryParams({ range: `${selectedRange}` });
          }}
          defaultRange={Number(range)}
        />
      </div>
    </nav>
  );
};

export default Nav;
