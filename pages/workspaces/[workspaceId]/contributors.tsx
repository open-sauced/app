import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { useGetWorkspaceContributors } from "lib/hooks/api/useGetWorkspaceContributors";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import ContributorsList from "components/organisms/ContributorsList/contributors-list";

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
    if (error.status === 404) {
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
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <div className="flex justify-between items-center">
        <WorkspacesTabList workspaceId={workspace.id} selectedTab={"contributors"} />
        <div>
          <DayRangePicker onDayRangeChanged={(value) => setPage(Number(value))} />
        </div>
      </div>
      <main className="py-8">
        <ClientOnly>
          {data && (
            <ContributorsList
              isLoading={isLoading}
              contributors={contributors}
              range={`${range}`}
              meta={data.meta}
              setPage={setPage}
            />
          )}
        </ClientOnly>
      </main>
    </WorkspaceLayout>
  );
}
