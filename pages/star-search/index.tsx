import { GetServerSidePropsContext } from "next";
import ProfileLayout from "layouts/profile";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import SEO from "layouts/SEO/SEO";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { StarSearchChat } from "components/StarSearch/StarSearchChat";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchParams = new URLSearchParams();
  let sharedPrompt: string | null = null;

  if (context.query.prompt) {
    sharedPrompt = context.query.prompt as string;
    searchParams.set("prompt", sharedPrompt);
  }

  const ogImageUrl = `${new URL(
    `/og-images/star-search/?${searchParams}`,
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  )}`;

  return { props: { ogImageUrl, sharedPrompt } };
}

type StarSearchPageProps = {
  ogImageUrl: string;
  sharedPrompt: string | null;
};

export default function StarSearchPage({ ogImageUrl, sharedPrompt }: StarSearchPageProps) {
  const { session } = useSession(true);
  const userId = session ? session.id : undefined;
  const { sessionToken: bearerToken } = useSupabaseAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <SEO
        title="OpenSauced Insights - StarSearch"
        description="Copilot, but for git history"
        image={ogImageUrl}
        twitterCard="summary_large_image"
      />
      <ProfileLayout showFooter={false}>
        <StarSearchChat userId={userId} sharedPrompt={sharedPrompt} bearerToken={bearerToken} isMobile={isMobile} />
      </ProfileLayout>
    </>
  );
}
