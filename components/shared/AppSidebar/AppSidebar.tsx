import { useRouter } from "next/router";
import {
  LifebuoyIcon,
  Cog8ToothIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationCircleIcon,
  NewspaperIcon,
  UserGroupIcon,
  PlusIcon,
  ChartBarSquareIcon,
  UsersIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { BiHomeAlt } from "react-icons/bi";
import { useEffectOnce } from "react-use";
import Link from "next/link";

import useWorkspaces from "lib/hooks/api/useWorkspaces";

import useUserInsights from "lib/hooks/useUserInsights";
import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import SingleSelect from "components/atoms/Select/single-select";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
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
}

export const AppSideBar = ({ workspaceId }: AppSideBarProps) => {
  const { username } = useSupabaseAuth();
  const { data: rawRepoInsights, isLoading: insightsLoading } = useUserInsights(!!username);
  const { data: lists, isLoading: listsLoading } = useFetchAllLists(30, !!username);
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ limit: 100 });
  const router = useRouter();

  const repoInsights = rawRepoInsights
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const contributorInsights = lists
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  interface GlobalEventHandlersEventMap {
    workspaceUpdated: CustomEvent;
  }

  useEffectOnce(() => {
    const mutateHandler = (event: Event) => {
      // eslint-disable-next-line no-console
      event instanceof CustomEvent && console.info(WORKSPACE_UPDATED_EVENT, event.detail);
      mutate();
    };

    document.addEventListener(WORKSPACE_UPDATED_EVENT, mutateHandler);

    return () => {
      document.removeEventListener(WORKSPACE_UPDATED_EVENT, mutateHandler);
    };
  });

  return (
    <div className="fixed top-0 pt-14 bg-white flex flex-col gap-8 justify-between max-w-xs w-72 h-full border-r border-slate-200">
      <div className="grid gap-4 mt-4 pr-4 pl-2">
        <label className="flex flex-col gap-2 ml-2">
          <span className="sr-only">Workspace</span>
          <SingleSelect
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
                router.push("/workspaces/new");
                return;
              }

              window.location.href = `/workspaces/${value}/repositories`;
            }}
          />
        </label>
        <SidebarMenuItem
          title="Home"
          url={`/workspaces/${workspaceId}/repositories`}
          icon={<BiHomeAlt className="w-5 h-5 text-slate-400" />}
        />
        <div className="grid gap-1 mb-6">
          <div className="flex flex-row justify-between items-center ">
            <h3 className="uppercase text-gray-500 text-xs font-medium tracking-wide px-2">Insights</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger title="Select type of new insight">
                <div title="" className="text-slate-600 text-xs font-medium tracking-tight leading-none group">
                  <PlusIcon className="w-5 h-5 p-0.5 inline-flex stroke-[3px] hover:stroke-[3px] text-semibold group-hover:bg-orange-100 group-hover:text-orange-600 rounded-md mr-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="flex flex-col gap-1 py-2 rounded-lg shadow-xl">
                <DropdownMenuItem className="rounded-md group">
                  <Link
                    title="New Repository Insight"
                    href="/hub/insights/new"
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
          </div>
          <div className="grid gap-2">
            <InsightsPanel
              title="Repository Insights"
              username={username}
              insights={repoInsights}
              type="repo"
              isLoading={insightsLoading}
            />
            <InsightsPanel
              title="Contributor Insights"
              username={username}
              insights={contributorInsights}
              type="list"
              isLoading={insightsLoading}
              workspaceId={workspaceId}
            />
          </div>
        </div>
      </div>
      <div className="list-none mb-4 px-2">
        {workspaceId ? (
          <SidebarMenuItem
            title="Settings"
            url={`/workspaces/${workspaceId}/settings`}
            icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
          />
        ) : null}
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
                <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">Give feedback</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md group">
              <Link
                title="Report a bug on our Github repository"
                href="https://github.com/open-sauced/app/issues/new?assignees=&labels=%F0%9F%91%80+needs+triage%2C%F0%9F%90%9B+bug&projects=&template=bug_report.yml&title=Bug%3A+"
                className="text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1"
              >
                <ExclamationCircleIcon className="w-5 h-5 text-slate-400 inline-flex mr-1 group-hover:text-orange-500" />
                <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">Report a bug</span>
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
        <SidebarMenuItem
          title="Read the docs"
          url="https://docs.opensauced.pizza/"
          icon={<BookOpenIcon className="w-5 h-5 text-slate-400" />}
        />
      </div>
    </div>
  );
};
