import { GetServerSidePropsContext } from "next";
import { captureException } from "@sentry/nextjs";
import ProfileLayout from "layouts/profile";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import SEO from "layouts/SEO/SEO";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useSession from "lib/hooks/useSession";
import { StarSearchChat } from "components/StarSearch/StarSearchChat";
import { UuidSchema, parseSchema } from "lib/validation-schemas";

const SUGGESTIONS = [
  {
    title: "Get information on contributor activity",
    prompt: "What type of pull requests has @brandonroberts worked on?",
  },
  {
    title: "Identify key contributors",
    prompt: "Who are the most prevalent contributors to the TypeScript ecosystem?",
  },
  {
    title: "Find contributors based on their work",
    prompt: "Show me the lottery factor for contributors in the remix-run/react-router project?",
  },
  {
    title: "Find experts",
    prompt: "Who are the best developers that know Tailwind and are interested in Rust?",
  },
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchParams = new URLSearchParams();
  let sharedChatId: string | null = null;

  if (context.query.id) {
    try {
      sharedChatId = parseSchema(UuidSchema, context.query.id);
      searchParams.set("id", sharedChatId);
    } catch (error) {
      captureException(new Error(`Failed to parse UUID for StarSearch. UUID: ${sharedChatId}`, { cause: error }));
      throw new Error("Invalid shared Chat ID");
    }
  }

  const ogImageUrl = `${new URL(
    `/og-images/star-search/?${searchParams}`,
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  )}`;

  return { props: { ogImageUrl, sharedChatId } };
}

type StarSearchPageProps = {
  ogImageUrl: string;
  sharedChatId: string | null;
};

export default function StarSearchPage({ ogImageUrl, sharedChatId }: StarSearchPageProps) {
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
        <StarSearchChat
          userId={userId}
          sharedChatId={sharedChatId}
          bearerToken={bearerToken}
          isMobile={isMobile}
          suggestions={SUGGESTIONS}
        />
      </ProfileLayout>
    </>
  );
}
