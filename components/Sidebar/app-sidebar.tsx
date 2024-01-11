import SidebarWrapper from "components/Sidebar/sidebar-wrapper";
import SidebarGroupWrapper from "components/Sidebar/sidebar-group-wrapper";
import SidebarMenuItem from "components/Sidebar/sidebar-menu-item";
import MenuHeader from "components/Sidebar/sidebar-menu-header";

import useUserInsights from "lib/hooks/useUserInsights";
import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

const AppSideBar = () => {
  const { username } = useSupabaseAuth();
  const { data: repoInsights, isLoading: insightsLoading } = useUserInsights(!!username, 5);
  const { data: lists, isLoading: listsLoading } = useFetchAllLists(30, !!username);

  const insights = [
    ...repoInsights.map((repoInsight) => ({
      id: repoInsight.id,
      name: repoInsight.name,
      updated_at: repoInsight.updated_at,
      type: "repo",
    })),
    ...lists.map((list) => ({ id: list.id, name: list.name, updated_at: list.updated_at, type: "list" })),
  ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  return (
    <SidebarWrapper>
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

export default AppSideBar;
