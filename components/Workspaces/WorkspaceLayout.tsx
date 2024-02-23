import { useLocalStorage } from "react-use";
import { LuArrowRightToLine } from "react-icons/lu";
import { useOutsideClick } from "rooks";
import { useRef } from "react";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import ClientOnly from "components/atoms/ClientOnly/client-only";

interface WorkspaceLayoutProps {
  workspaceId: string | null;
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, children }: WorkspaceLayoutProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [showingSidebar, setShowingSidebar] = useLocalStorage("showingSidebar", isLargeScreen);
  const hideSidebar = () => setShowingSidebar(false);
  const sidebarRef = useRef(null);
  useOutsideClick(sidebarRef, hideSidebar);

  return (
    <div className="grid  grid-rows-[3.3rem,auto,1fr]">
      <div>
        <TopNav />
      </div>
      <div className="relative px-8 pb-20">
        <ClientOnly>
          <span ref={sidebarRef}>
            <AppSideBar workspaceId={workspaceId} hideSidebar={hideSidebar} sidebarCollapsed={showingSidebar} />
          </span>
          {!showingSidebar && (
            <button
              onClick={() => setShowingSidebar(true)}
              className="fixed z-50 border-8 border-solid border-black inset-x-0 top-16 w-fit bg-white rounded-r-md shadow-lg p-2"
            >
              <LuArrowRightToLine className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </ClientOnly>
        {children}
      </div>
    </div>
  );
};
