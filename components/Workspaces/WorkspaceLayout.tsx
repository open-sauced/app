import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";

interface WorkspaceLayoutProps {
  workspaceId: string | null;
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, children }: WorkspaceLayoutProps) => {
  return (
    <div
      className="grid grid-cols-[18rem,1fr] grid-rows-[3.3rem,auto,1fr]"
      style={{
        gridTemplateAreas: `
      "header header"
      "sidebar main"
    `,
      }}
    >
      <div style={{ gridArea: "header" }}>
        <TopNav hideInsights={true} />
      </div>
      <div style={{ gridArea: "sidebar" }}>
        <AppSideBar workspaceId={workspaceId} />
      </div>
      <div className="px-8 pt-8 pb-20" style={{ gridArea: "main" }}>
        {children}
      </div>
    </div>
  );
};
