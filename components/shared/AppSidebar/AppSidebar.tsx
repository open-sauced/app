import { useRouter } from "next/router";
import {
  LifebuoyIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationCircleIcon,
  NewspaperIcon,
  UserGroupIcon,
  PlusIcon,
  ChartBarSquareIcon,
  UsersIcon,
  BookOpenIcon,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { BiHomeAlt } from "react-icons/bi";
import { useEffectOnce } from "react-use";
import Link from "next/link";
import { LuArrowLeftToLine } from "react-icons/lu";
import Image from "next/image";
import useWorkspaces from "lib/hooks/api/useWorkspaces";

import SingleSelect from "components/atoms/Select/single-select";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import { useWorkspacesRepositoryInsights } from "lib/hooks/api/useWorkspaceRepositoryInsights";
import { useWorkspacesContributorInsights } from "lib/hooks/api/useWorkspaceContributorInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { InsightsPanel } from "./InsightsPanel";
import SidebarMenuItem from "./sidebar-menu-item";

const SidebarLoader = () => {
  return (
    <>
      <SkeletonWrapper height={20} radius={5} count={2} classNames="w-48" />
      <SkeletonWrapper height={20} radius={5} count={1} classNames="w-28" />
    </>
  );
};

export const WORKSPACE_UPDATED_EVENT = "workspaceUpdated";

interface AppSideBarProps {
  workspaceId: string | null;
  hideSidebar: () => void;
  sidebarCollapsed?: boolean;
}

export const AppSideBar = ({ workspaceId, hideSidebar, sidebarCollapsed }: AppSideBarProps) => {
  const { user, signIn } = useSupabaseAuth();
  const { data: rawRepoInsights, isLoading: repoInsightsLoading } = useWorkspacesRepositoryInsights({ workspaceId });
  const { data: rawContributorInsights, isLoading: contributorInsightsLoading } = useWorkspacesContributorInsights({
    workspaceId,
  });
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ load: !!user, limit: 100 });
  const router = useRouter();

  const repoInsights = rawRepoInsights
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const contributorInsights = rawContributorInsights
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  interface GlobalEventHandlersEventMap {
    workspaceUpdated: CustomEvent;
  }

  useEffectOnce(() => {
    const mutateHandler = () => {
      mutate();
    };

    document.addEventListener(WORKSPACE_UPDATED_EVENT, mutateHandler);

    return () => {
      document.removeEventListener(WORKSPACE_UPDATED_EVENT, mutateHandler);
    };
  });

  const { data: gitHubUser } = useFetchUser(user?.user_metadata.user_name);
  const userInterest = gitHubUser?.interests.split(",")[0] || "javascript";

  return (
    // TODO: get rid of the z-index. There is grid content like the avatars and paged data text that bleed through the sidebar atm.
    <div
      aria-hidden={sidebarCollapsed}
      className={`fixed left-0 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out border-r ${
        sidebarCollapsed ? "-translate-x-full" : ""
      } bg-white flex flex-col gap-8 justify-between max-w-xs  border-r border-slate-200 z-50`}
      style={{
        "--top-nav-height": "3.3rem",
        top: "var(--top-nav-height)",
        height: "calc(100dvh - var(--top-nav-height))",
      }}
    >
      {sidebarCollapsed ? null : (
        <>
          <nav aria-label="sidebar navigation" className="grid gap-4 mt-4 pr-4 pl-2">
            <div className="flex gap-2">
              <label className="workspace-drop-down flex flex-col w-full gap-2 ml-2">
                <span className="sr-only">Workspace</span>
                <SingleSelect
                  isSearchable={!!user}
                  options={[
                    { label: "Create new workspace...", value: "new" },
                    ...workspaces.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    })),
                  ]}
                  position="popper"
                  value={workspaceId ?? "new"}
                  placeholder="Select a workspace"
                  onValueChange={(value) => {
                    if (value === "new") {
                      if (!user) {
                        signIn({
                          provider: "github",
                          options: {
                            redirectTo: `${new URL("/workspaces/new", window.location.href)}`,
                          },
                        });
                        return;
                      }
                      router.push("/workspaces/new");
                      return;
                    }
                    router.push(`/workspaces/${value}`);
                  }}
                />
              </label>
              <button onClick={hideSidebar} className="hover:bg-slate-50 p-2 rounded-md">
                <LuArrowLeftToLine className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {workspaceId === "new" ? null : (
              <ul className="grid gap-1 mb-6">
                {!!user && (
                  <SidebarMenuItem
                    title="Home"
                    url={`/workspaces/${workspaceId}`}
                    icon={<BiHomeAlt className="w-5 h-5 text-slate-400" />}
                  />
                )}
                {!!user && (
                  <li className="flex flex-row justify-between items-center ">
                    <h3 className="uppercase text-gray-500 text-xs font-medium tracking-wide px-2">Insights</h3>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger title="Select type of new insight">
                        <PlusIcon
                          style={{ strokeWidth: "3px" }}
                          className="w-5 h-5 p-0.5 text-semibold group-hover:bg-orange-100 rounded-md"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        className="sidebar-new-insights-menu flex flex-col gap-1 py-2 rounded-lg shadow-xl"
                      >
                        <DropdownMenuItem className="rounded-md group">
                          <Link
                            title="New Repository Insight"
                            href={`/workspaces/${workspaceId}/repository-insights/new`}
                            className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
                          >
                            <ChartBarSquareIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:stroke-orange-500" />
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                              New Repository Insight
                            </span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-md group">
                          <Link
                            title="New Contributor Insight"
                            href={`/workspaces/${workspaceId}/contributor-insights/new`}
                            className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
                          >
                            <UsersIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:stroke-orange-500" />
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                              New Contributor Insight
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )}
                <li className="grid gap-2 overflow-hidden">
                  <InsightsPanel
                    title="Repository Insights"
                    insights={repoInsights}
                    type="repo"
                    isLoading={repoInsightsLoading}
                    workspaceId={workspaceId}
                  />
                  <InsightsPanel
                    title="Contributor Insights"
                    insights={contributorInsights}
                    type="list"
                    isLoading={contributorInsightsLoading}
                    workspaceId={workspaceId}
                  />
                </li>
              </ul>
            )}
          </nav>
          <nav aria-label="bottom sidebar navigation" className="grid gap-2">
            <ul className="list-none px-2 lg:hidden">
              <SidebarMenuItem
                title="Highlights"
                url="/feed"
                icon={<ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400" />}
              />
              <SidebarMenuItem
                title="Explore"
                url={`/explore/topic/${userInterest}/dashboard/filter/recent`}
                icon={<Squares2X2Icon className="w-5 h-5 text-slate-400" />}
              />
              {/* StarSearch link in smaller screen with <Image /> tag from next/image */}
              <SidebarMenuItem
                title="StarSearch"
                url={"/star-search"}
                icon={<Image src="/assets/star-search-logo.svg" alt="" width={20} height={20} />}
              />
            </ul>
            <ul className="border-t-1 pt-1 mb-2 px-2">
              <li>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger
                    title="Support options"
                    className="w-full text-sm font-medium flex gap-1 items-center py-2 px-2 hover:bg-slate-100 rounded-md transition-colors cursor-pointer tracking-tight"
                  >
                    <LifebuoyIcon className="w-5 h-5 text-slate-400 inline-flex" />
                    <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex text-slate-800">
                      Support
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="flex flex-col gap-1 py-2 rounded-lg">
                    <DropdownMenuItem className="rounded-md group">
                      <Link
                        title="Give feedback"
                        href="https://github.com/orgs/open-sauced/discussions"
                        className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
                      >
                        <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:text-orange-500" />
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                          Give feedback
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md group">
                      <Link
                        title="Report a bug on our GitHub repository"
                        href="https://github.com/open-sauced/app/issues/new?assignees=&labels=%F0%9F%91%80+needs+triage%2C%F0%9F%90%9B+bug&projects=&template=bug_report.yml&title=Bug%3A+"
                        className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
                      >
                        <ExclamationCircleIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:text-orange-500" />
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                          Report a bug
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md group">
                      <Link
                        title="Checkout our blog on dev.to"
                        href="https://dev.to/opensauced"
                        className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
                      >
                        <NewspaperIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:text-orange-500" />
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                          Checkout our blog
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md group">
                      <Link
                        title="Join our community on Discord"
                        href="https://discord.com/invite/opensauced"
                        className="text-sm font-medium flex gap-1 items-center transition-colors cursor-pointer tracking-tight p-1"
                      >
                        <UserGroupIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:text-orange-500" />
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                          Join our community
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <SidebarMenuItem
                title="Settings"
                url={`/user/settings`}
                icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
              />
              <SidebarMenuItem
                title="Read the docs"
                url="https://docs.opensauced.pizza/"
                icon={<BookOpenIcon className="w-5 h-5 text-slate-400" />}
              />
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
