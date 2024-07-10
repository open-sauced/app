import { GetServerSidePropsContext } from "next";
import { usePostHog } from "posthog-js/react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdWorkspaces } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import dynamic from "next/dynamic";
import { fetchApiData } from "helpers/fetchApiData";
import { RepositoryOgImage, getRepositoryOgImage } from "components/Repositories/RepositoryOgImage";
import { getAvatarByUsername } from "lib/utils/github";
import { useToast } from "lib/hooks/useToast";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { shortenUrl } from "lib/utils/shorten-url";
import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/shared/Button/button";
import { DayRangePicker } from "components/shared/DayRangePicker";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import Contributors from "components/organisms/Contributors/contributors";
import TabList from "components/TabList/tab-list";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import useSession from "lib/hooks/useSession";
import { writeToClipboard } from "lib/utils/write-to-clipboard";

const AddToWorkspaceModal = dynamic(() => import("components/Repositories/AddToWorkspaceModal"), {
  ssr: false,
});
const AddToWorkspaceDrawer = dynamic(() => import("components/Repositories/AddToWorkspaceDrawer"), {
  ssr: false,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };
  const range = (context.query.range ? Number(context.query.range) : 30) as Range;

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}/info`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const { href: ogImageUrl } = new URL(
    getRepositoryOgImage({
      description: repoData.description,
      fullRepoName: repoData.full_name,
      range,
    }),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  // Cache for two hours
  context.res.setHeader("Netlify-CDN-Cache-Control", "public, max-age=0, stale-while-revalidate=7200");
  context.res.setHeader("Netlify-Vary", "query=range");
  context.res.setHeader("Cache-Tag", `repo-pages,repo-page-${repoData.id}`);

  return { props: { repoData, ogImageUrl } };
}

type Range = 30 | 7 | 90 | 180 | 360;

interface RepoPageProps {
  repoData: DbRepoInfo;
  ogImageUrl: string;
}

export default function RepoPageContributorsTab({ repoData, ogImageUrl }: RepoPageProps) {
  const avatarUrl = getAvatarByUsername(repoData.full_name.split("/")[0], 96);
  const { toast } = useToast();
  const posthog = usePostHog();
  const { session } = useSession(true);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const [isAddToWorkspaceModalOpen, setIsAddToWorkspaceModalOpen] = useState(false);
  const tabList = [
    { name: "Overview", path: "" },
    { name: "Contributors", path: "contributors" },
  ];

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: repo page share button", {
      repo_name: repoData.full_name,
    });

    try {
      const shortUrl = await shortenUrl(url);
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard.", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <section className="px-2 pt-2 md:py-4 md:px-4 flex flex-col gap-2 md:gap-4 lg:gap-8 w-full xl:max-w-8xl">
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
              <header className="flex items-center gap-4">
                <Avatar size={96} avatarURL={avatarUrl} />
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://github.com/${repoData.full_name}`}
                    target="_blank"
                    className="group hover:underline underline-offset-2 text-xl md:text-3xl font-bold flex gap-2 items-center"
                  >
                    <h1>{repoData.full_name}</h1>
                    <HiOutlineExternalLink className="group-hover:text-sauced-orange text-lg lg:text-xl" />
                  </a>
                  <p className="md:text-xl">{repoData.description}</p>
                </div>
              </header>
              <div className="self-end flex flex-col gap-2 items-end">
                {isMobile ? (
                  <AddToWorkspaceDrawer repository={repoData.full_name} />
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setIsAddToWorkspaceModalOpen(true)}
                    className="shrink-0 items-center gap-3 w-fit"
                  >
                    <MdWorkspaces />
                    Add to Workspace
                  </Button>
                )}
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    onClick={copyUrlToClipboard}
                    className="my-auto gap-2 items-center shrink-0 place-self-end"
                  >
                    <FiCopy />
                    Share
                  </Button>
                  <DayRangePicker />
                </div>
              </div>
            </div>
            <div className="border-b">
              <TabList tabList={tabList} selectedTab={"contributors"} pageId={`/s/${repoData.full_name}`} />
            </div>
            <ClientOnly>
              <Contributors repositories={[repoData.id]} defaultLayout="grid" />
            </ClientOnly>
          </section>
        </div>
      </WorkspaceLayout>

      <AddToWorkspaceModal
        repository={repoData.full_name}
        isOpen={isAddToWorkspaceModalOpen}
        onCloseModal={() => setIsAddToWorkspaceModalOpen(false)}
      />
    </>
  );
}
