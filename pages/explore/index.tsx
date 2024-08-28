import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Card from "components/atoms/Card/card";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import useSession from "lib/hooks/useSession";

export default function ExploreHomePage() {
  const { session } = useSession(true);

  return (
    <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
      <div className="px-4 py-8 lg:px-16 lg:py-12 flex flex-col gap-12">
        <section className="flex flex-col items-center w-full gap-8">
          <h1 className="text-4xl font-medium">Explore Open Source Repositories</h1>
          <Search name="Explore repositories" className="h-12 w-full max-w-6xl" />
        </section>

        <section className="flex flex-col gap-8">
          <Title>Trending repositories</Title>
          <Card>
            <h1>open-sauced/app</h1>
          </Card>
        </section>

        <section className="flex flex-col gap-8">
          <Title>Discover Workspaces</Title>
          <Card>
            <h1>Fair Source Companies</h1>
          </Card>
        </section>
      </div>
    </WorkspaceLayout>
  );
}
