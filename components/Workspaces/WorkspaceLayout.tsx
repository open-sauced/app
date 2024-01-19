import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";

export const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="grid grid-cols-[20rem,1fr] grid-rows-[3.3rem,auto,1fr]"
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
        <AppSideBar />
      </div>
      <div className="px-8 pt-8" style={{ gridArea: "main" }}>
        {children}
      </div>
    </div>
  );
};
