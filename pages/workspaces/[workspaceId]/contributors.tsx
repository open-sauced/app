import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { useGetWorkspaceContributors } from "lib/hooks/api/useGetWorkspaceContributors";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";
import Button from "components/shared/Button/button";
import Card from "components/atoms/Card/card";
import { EmptyState } from "components/Workspaces/TrackedContributorsTable";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

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

interface WorkspaceContributorsPageProps {
  workspace: Workspace;
}

export default function WorkspaceContributorsPage({ workspace }: WorkspaceContributorsPageProps) {
  const { userId } = useSupabaseAuth();
  const loggedIn = Boolean(userId);
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const [page, setPage] = useState(1);

  const { data, error: hasError } = useGetWorkspaceContributors({
    workspaceId: workspace.id,
    range,
    page,
  });
  const contributors = data?.data
    ? Array.from(data.data, (info) => {
        return {
          login: info.contributor.login,
          updated_at: info.contributor.updated_at,
          id: info.contributor_id,
          devstats_updated_at: info.contributor.devstats_updated_at,
        } as DbUserContributor;
      })
    : [];

  const isLoading = !data && !hasError;

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <div className="px-4 py-8 lg:px-16 lg:py-12">
        <WorkspaceHeader workspace={workspace} />

        <div className="flex justify-between items-center">
          <WorkspacesTabList workspaceId={workspace.id} selectedTab={"contributors"} />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/workspaces/${workspace.id}/settings#load-contributors-wizard`)}
            >
              Add contributors
            </Button>
            <DayRangePicker onDayRangeChanged={(value) => setPage(Number(value))} />
          </div>
        </div>
        <div className="py-8">
          <ClientOnly>
            {data && contributors.length > 0 ? (
              <ContributorsList
                isLoading={isLoading}
                contributors={contributors}
                range={`${range}`}
                meta={data.meta}
                setPage={setPage}
                loggedIn={loggedIn}
              />
            ) : (
              <Card className="bg-transparent">
                <EmptyState
                  onAddContributors={() => router.push(`/workspaces/${workspace.id}/settings#load-contributors-wizard`)}
                />
              </Card>
            )}
          </ClientOnly>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
