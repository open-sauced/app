import { GetServerSidePropsContext } from "next";
import { fetchApiData } from "helpers/fetchApiData";

import SEO from "layouts/SEO/SEO";
import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const { org, repo } = params ?? { org: "", repo: "" };

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  // todo: better way to get avatar???
  const response = await fetch(repoData.url);
  const { owner } = await response.json();

  return { props: { repoData, image: owner.avatar_url } };
}

export default function RepoPage({ repoData, image }: { repoData: DbRepo; image: string }) {
  return (
    <ProfileLayout>
      <SEO title={`${repoData.full_name} - OpenSauced Insights`} />
      <header className="flex items-center gap-4 self-start p-8">
        <Avatar size={96} avatarURL={image} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{repoData.full_name}</h1>
          <p className="text-xl">{repoData.description}</p>
        </div>
      </header>
    </ProfileLayout>
  );
}
