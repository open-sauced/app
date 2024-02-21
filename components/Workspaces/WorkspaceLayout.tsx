import { useLocalStorage } from "react-use";
import { LuArrowRightToLine } from "react-icons/lu";
import TopNav from "components/organisms/TopNav/top-nav";
import { AppSideBar } from "components/shared/AppSidebar/AppSidebar";

interface WorkspaceLayoutProps {
  workspaceId: string | null;
  children: React.ReactNode;
}

export const WorkspaceLayout = ({ workspaceId, children }: WorkspaceLayoutProps) => {
  const [showingSidebar, setShowingSidebar] = useLocalStorage("showingSidebar", true);
  return (
    <div className="grid  grid-rows-[3.3rem,auto,1fr]">
      <div>
        <TopNav />
      </div>
      <div className="relative px-8 pt-8 pb-20">
        <span
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform  transition-transform duration-300 ease-in-out border-r ${
            showingSidebar ? "" : "-translate-x-full"
          }`}
        >
          <AppSideBar workspaceId={workspaceId} hideSidebar={() => setShowingSidebar(false)} />
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
