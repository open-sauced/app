import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { LimitPicker } from "components/shared/LimitPicker";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { setQueryParams } from "lib/utils/query-params";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { OrderIssuesBy, useGetWorkspaceIssues } from "lib/hooks/api/useGetWorkspaceIssues";
import { WorkspaceIssueTable } from "components/Workspaces/WorkspaceIssuesTable";
import { SubTabsList } from "components/TabList/tab-list";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { StarSearchEmbed } from "components/StarSearch/StarSearchEmbed";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";
import { WORKSPACE_STARSEARCH_SUGGESTIONS } from "lib/utils/star-search";
import { OrderDirection } from "lib/utils/sorting";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);

  if (error) {
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  return { props: { workspace: data } };
};

interface WorkspaceDashboardProps {
  workspace: Workspace;
}

const WorkspaceIssuesPage = ({ workspace }: WorkspaceDashboardProps) => {
  const { sessionToken, signIn, userId } = useSupabaseAuth();
  const {
    data: workspaceMembers = [],
    isLoading: isLoadingMembers,
    isError: isMembersError,
  } = useWorkspaceMembers({ workspaceId: workspace.id, limit: 1000 });
  const workspaceMember =
    !isLoadingMembers && !isMembersError
      ? (workspaceMembers || []).find((member) => member.user_id === Number(userId))
      : null;
  const isOwner = workspaceMember?.role === "owner";
  const isEditor = isOwner || workspaceMember?.role === "editor";

  const router = useRouter();
  const {
    limit = 10,
    range: rawRange = 30,
    page = 1,
    orderDirection = "",
    orderBy = "",
  } = router.query as { limit: string; range: string; page: string; orderDirection: OrderDirection; orderBy: string };
  const range = Number(rawRange);
  const { data: repositories, error: hasError } = useGetWorkspaceRepositories({ workspaceId: workspace.id, range });
  const [filteredRepositories, setFilteredRepositories] = useState<OptionKeys[]>([]);
  const filterOptions = repositories
    ? Array.from(repositories?.data!, (repo) => {
        return { label: repo.repo.full_name, value: `${repo.repo_id}` };
      })
    : [];
  const repoIds = filteredRepositories.map((option) => Number(option.value));
  const {
    meta,
    data: issues,
    isError,
    isLoading,
  } = useGetWorkspaceIssues({
    workspaceId: workspace.id,
    page: Number(page),
    limit: Number(limit),
    orderDirection: orderDirection as OrderDirection,
    orderBy: orderBy as OrderIssuesBy,
    range,
    repoIds,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <WorkspaceLayout workspaceId={workspace.id}>
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <WorkspaceHeader workspace={workspace} />
          <div className="grid sm:flex gap-4 pt-3">
            <WorkspacesTabList workspaceId={workspace.id} selectedTab={"activity"} />
          </div>
          <div className="mt-6 grid gap-6">
            <div className="grid md:flex gap-2 md:gap-4 w-full items-center mb-2">
              <div className="flex items-center justify-between w-full md:w-fit">
                <SubTabsList
                  label="Activity pages"
                  textSize="small"
                  tabList={[
                    { name: "Pull Requests", path: "activity" },
                    { name: "Issues", path: "issues" },
                  ]}
                  selectedTab={"issues"}
                  pageId={`/workspaces/${workspace.id}`}
                />
                {isMobile ? <DayRangePicker /> : null}
              </div>
              <div className="flex items-center justify-end gap-2 flex-wrap w-full">
                <TrackedRepositoryFilter
                  options={filterOptions}
                  handleSelect={(selected: OptionKeys[]) => {
                    setFilteredRepositories(selected);
                    setQueryParams({ page: "1" });
                  }}
                />
                {isMobile ? null : <DayRangePicker />}
                <LimitPicker />
              </div>
            </div>
            <ClientOnly>
              <WorkspaceIssueTable isLoading={isLoading} data={issues} meta={meta} />
            </ClientOnly>
          </div>
        </div>
      </WorkspaceLayout>
      <ClientOnly>
        <StarSearchEmbed
          userId={userId}
          isEditor={isEditor}
          bearerToken={sessionToken}
          suggestions={WORKSPACE_STARSEARCH_SUGGESTIONS}
          isMobile={isMobile}
          // TODO: implement once we have shared chats in workspaces
          sharedChatId={null}
          tagline="Ask anything about your workspace"
          workspaceId={workspace.id}
          signInHandler={() => signIn({ provider: "github", options: { redirectTo: window.location.href } })}
        />
      </ClientOnly>
    </>
  );
};

export default WorkspaceIssuesPage;
