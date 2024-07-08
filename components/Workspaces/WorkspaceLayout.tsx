import { useLocalStorage } from "react-use";
import { LuArrowRightToLine } from "react-icons/lu";
import { useOutsideClick } from "rooks";
import { useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import ClientOnly from "components/atoms/ClientOnly/client-only";

interface WorkspaceLayoutProps {
  workspaceId: string;
  banner?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, banner, children, footer }: WorkspaceLayoutProps) => {
  const { user } = useSupabaseAuth();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [showingSidebar, setShowingSidebar] = useLocalStorage("showingSidebar", !user ? false : isLargeScreen);
  const hideSidebar = () => setShowingSidebar(false);
  const sidebarRef = useRef<HTMLSpanElement | null>(null);
  const [showingSignupNudge, setShowingSignupNudge] = useState(true);

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
    <>
      <div
        className="grid"
        style={{
          gridTemplateRows: "var(--top-nav-height) auto 1fr",
          minHeight: "calc(100vh - var(--top-nav-height))",
        }}
      >
        <div>
          <TopNav />
          <ClientOnly>
            <span ref={sidebarRef}>
              <AppSideBar workspaceId={workspaceId} hideSidebar={hideSidebar} sidebarCollapsed={!showingSidebar} />
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
        <div className="flex-col w-full items-center grow">
          <ClientOnly>{banner}</ClientOnly>
          <div className={clsx("w-full min-w-screen min-h-[100px] pb-20", banner && "md:mt-9")}>{children}</div>
        </div>
      </div>
      {footer ? (
        <div className="sticky bottom-0 bg-light-slate-2 border-t h-16 pr-3 flex flex-col justify-center items-end">
          <div className="border-t flex">{footer}</div>
        </div>
      ) : null}
      {!user && showingSignupNudge ? (
        <div className="sticky w-full min-w-screen bottom-0 bg-light-slate-2 border-t h-16 pr-3 grid place-content-center grid-flow-col gap-4 px-4 md:hidden">
          <span>
            <Link href="/start" className="text-sauced-orange hover:underline">
              Sign up
            </Link>{" "}
            to start tracking your projects!
          </span>
          <button onClick={() => setShowingSignupNudge(false)}>
            <IoClose className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </>
  );
};
