import { useState } from "react";
import { LuArrowRightToLine } from "react-icons/lu";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";

interface WorkspaceLayoutProps {
  workspaceId: string | null;
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, children }: WorkspaceLayoutProps) => {
  const [showingSidebar, setShowingSidebar] = useState(true);
  return (
    <div
      className="grid grid-cols-[18rem,1fr] grid-rows-[3.3rem,auto,1fr]"
      style={{
        gridTemplateAreas: `
      "header header"
      "${showingSidebar ? "sidebar" : "main"} main"
    `,
      }}
    >
      <div style={{ gridArea: "header" }}>
        <TopNav hideInsights={true} />
      </div>
      <div style={{ gridArea: "sidebar" }} className="transition-all duration-150">
        <AppSideBar workspaceId={workspaceId} hideSidebar={() => setShowingSidebar(false)} />
      </div>
      <div className="relative px-8 pt-8 pb-20" style={{ gridArea: "main" }}>
        {!showingSidebar && (
          <button
            onClick={() => setShowingSidebar(true)}
            className="fixed z-50 border-8 border-solid border-black inset-x-0 top-16 w-fit bg-white rounded-r-md shadow-lg p-2"
          >
            <LuArrowRightToLine className="w-4 h-4 text-gray-500" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
