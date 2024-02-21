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
import { deleteCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/workspace-utils";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";
import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
import { EmptyState } from "components/Workspaces/TrackedContributorsTable";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";

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
    deleteCookie(context.res, WORKSPACE_ID_COOKIE_NAME);

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  return { props: { workspace: data } };
};

interface WorkspaceContributorsPageProps {
  workspace: Workspace;
}

export default function WorkspaceContributorsPage({ workspace }: WorkspaceContributorsPageProps) {
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
          author_login: info.contributor.login,
          username: info.contributor.username,
          updated_at: info.contributor.updated_at,
          user_id: info.contributor_id,
        };
      })
    : [];

  const isLoading = !data && !hasError;

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
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
      <main className="py-8">
        <ClientOnly>
          {data && contributors.length > 0 ? (
            <ContributorsList
              isLoading={isLoading}
              contributors={contributors}
              range={`${range}`}
              meta={data.meta}
              setPage={setPage}
            />
          ) : (
            <Card className="bg-transparent">
              <EmptyState
                onAddContributors={() => router.push(`/workspaces/${workspace.id}/settings#load-contributors-wizard`)}
              />
            </Card>
          )}
        </ClientOnly>
      </main>
    </WorkspaceLayout>
  );
}
