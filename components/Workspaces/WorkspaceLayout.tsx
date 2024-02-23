import { useLocalStorage } from "react-use";
import { LuArrowRightToLine } from "react-icons/lu";
import { useOutsideClick } from "rooks";
import { useRef } from "react";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

interface WorkspaceLayoutProps {
  workspaceId: string | null;
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, children }: WorkspaceLayoutProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [showingSidebar, setShowingSidebar] = useLocalStorage("showingSidebar", isLargeScreen);
  const hideSidebar = () => setShowingSidebar(false);
  const sidebarRef = useRef<HTMLSpanElement | null>(null);
  useOutsideClick(
    sidebarRef,
    (event) => {
      if (
        event.target instanceof HTMLElement &&
        // for some reason opening the workspaces dropdown has the event.target as the html element
        // so checking to avoid closing the sidebar when the dropdown is used
        event.target.tagName !== "HTML" &&
        !sidebarRef.current?.contains(event.target)
      ) {
        hideSidebar();
      }
    },
    Boolean(sidebarRef.current)
  );

  return (
    <div className="grid  grid-rows-[3.3rem,auto,1fr]">
      <div>
        <TopNav />
      </div>
      <div className="relative px-8 pb-20">
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
        {children}
      </div>
    </div>
  );
};
