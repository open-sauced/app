import { useState } from "react";
import { useRouter } from "next/router";
import useWorkspaces from "lib/hooks/api/useWorkspaces";
import SidebarWrapper from "components/Sidebar/sidebar-wrapper";
import SidebarGroupWrapper from "components/Sidebar/sidebar-group-wrapper";
import SidebarMenuItem from "components/Sidebar/sidebar-menu-item";
import MenuHeader from "components/Sidebar/sidebar-menu-header";

import useUserInsights from "lib/hooks/useUserInsights";
import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import SingleSelect from "components/atoms/Select/single-select";
import ClientOnly from "components/atoms/ClientOnly/client-only";

export const AppSideBar = () => {
  const { username } = useSupabaseAuth();
  const { data: repoInsights, isLoading: insightsLoading } = useUserInsights(!!username);
  const { data: lists, isLoading: listsLoading } = useFetchAllLists(30, !!username);
  const { data: workspaces, isLoading: workspacesLoading } = useWorkspaces({ limit: 100 });
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<string>(router.query.workspaceId as string);

  const insights = [
    ...repoInsights.slice(0, 5).map((repoInsight) => ({
      id: repoInsight.id,
      name: repoInsight.name,
      updated_at: repoInsight.updated_at,
      type: "repo",
    })),
    ...lists.map((list) => ({ id: list.id, name: list.name, updated_at: list.updated_at, type: "list" })),
  ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  return (
    <SidebarWrapper>
      <label className="flex flex-col gap-2 text-sm ml-2 w-max">
        <span className="sr-only">Workspace</span>
        <ClientOnly>
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
        </ClientOnly>
      </label>
      <MenuHeader>Your Insights</MenuHeader>
      <SidebarGroupWrapper isLoading={insightsLoading || listsLoading}>
        {insights.map((insight) => {
          if (insight.type === "repo") {
            return (
              <SidebarMenuItem
                key={insight.id}
                title={insight.name}
                href={`/pages/${username}/${insight.id}/dashboard`}
                type="repo"
              />
            );
          }

          return (
            <SidebarMenuItem key={insight.id} title={insight.name} href={`/lists/${insight.id}/overview`} type="list" />
          );
        })}
      </SidebarGroupWrapper>

      {/* <MenuHeader>Shared with you</MenuHeader>
      <SidebarGroupWrapper>
        <SidebarMenuItem title="Javascript frameworks" href="/community" type="repo" />
        <SidebarMenuItem title="Staff Picks" href="/trending" type="repo" />
        <SidebarMenuItem title="Potential Hires" href="/trending" type="repo" />
      </SidebarGroupWrapper> */}
    </SidebarWrapper>
  );
};
