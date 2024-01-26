import { useState } from "react";
import { useRouter } from "next/router";
import { LifebuoyIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { BiHomeAlt } from "react-icons/bi";
import { useEffectOnce } from "react-use";

import useWorkspaces from "lib/hooks/api/useWorkspaces";

import useUserInsights from "lib/hooks/useUserInsights";
import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import SingleSelect from "components/atoms/Select/single-select";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
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

export const AppSideBar = () => {
  const { username } = useSupabaseAuth();
  const { data: rawRepoInsights, isLoading: insightsLoading } = useUserInsights(!!username);
  const { data: lists, isLoading: listsLoading } = useFetchAllLists(30, !!username);
  const { data: workspaces, isLoading: workspacesLoading, mutate } = useWorkspaces({ limit: 100 });
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<string>(router.query.workspaceId as string);

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
    <div className="fixed top-0 pt-12 bg-white flex flex-col gap-8 justify-between max-w-xs w-80 h-full">
      <div className="grid gap-4 mt-4 px-4">
        <label className="flex flex-col gap-2 w-max">
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
            value={workspaceId}
            placeholder="Select a workspace"
            onValueChange={(value) => {
              if (value === "new") {
                router.push("/workspaces/new");
                return;
              }

              setWorkspaceId(value);
              window.location.href = `/workspaces/${value}/settings`;
            }}
          />
        </label>
        <h2 className="flex gap-1 items-center">
          <BiHomeAlt className="w-5 h-5 text-slate-400" />
          Home
        </h2>
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
        />

        <h3 className="uppercase text-gray-500 text-sm font-medium">Shared with you</h3>
      </div>
      <ul className="list-none mb-4">
        <SidebarMenuItem title="Support" url="/logout" icon={<LifebuoyIcon className="w-5 h-5 text-slate-400" />} />
        <SidebarMenuItem
          title="Settings"
          url={`/workspaces/${workspaceId}/settings`}
          icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
        />
      </ul>
    </div>
  );
};
