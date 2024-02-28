import dynamic from "next/dynamic";
import { useLocalStorage } from "react-use";
import { LuArrowRightToLine } from "react-icons/lu";
import { useOutsideClick } from "rooks";
import { useState, useRef } from "react";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import Footer from "components/organisms/Footer/footer";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface WorkspaceLayoutProps {
  workspaceId: string;
  bannerProps?: {
    variant: "repositories" | "contributors";
    overLimit: number;
    showBanner: boolean;
  };
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, bannerProps, children }: WorkspaceLayoutProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [showingSidebar, setShowingSidebar] = useLocalStorage("showingSidebar", isLargeScreen);
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);
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
        !sidebarRef.current?.contains(event.target) &&
        !event.target.closest(".sidebar-new-insights-menu")
      ) {
        hideSidebar();
      }
    },
    Boolean(sidebarRef.current)
  );

  return (
    <div
      className="grid"
      style={{
        "--top-nav-height": "3.3rem",
        gridTemplateRows: "var(--top-nav-height) auto 1fr",
        minHeight: "calc(100vh - var(--top-nav-height))",
      }}
    >
      <div>
        <TopNav />
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
      </div>
      <div className="relative flex flex-col items-center grow pt-8 md:pt-14 lg:pt-20">
        {bannerProps?.showBanner && (
          <button
            onClick={() => setIsInsightUpgradeModalOpen(true)}
            className="absolute top-0 inset-x-0 w-full py-2 text-white text-center bg-light-orange-10"
          >
            This insight page is over the free limit.{" "}
            <span className="font-semibold underline">Upgrade to a PRO Workspace.</span>
          </button>
        )}
        <div className="px-1 sm:px-2 md:px-4 xl:px-16 container w-full min-h-[100px]">{children}</div>
        {bannerProps && (
          <InsightUpgradeModal
            workspaceId={workspaceId}
            overLimit={bannerProps.overLimit}
            variant={bannerProps.variant}
            isOpen={isInsightUpgradeModalOpen}
            onClose={() => setIsInsightUpgradeModalOpen(false)}
          />
        )}
      </div>
      <div className="flex self-end pt-2">
        <Footer />
      </div>
    </div>
  );
};
