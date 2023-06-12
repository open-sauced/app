import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import SEO from "layouts/SEO/SEO";

interface InsightPageProps {
  insight: DbUserInsight;
  pageName: string;
  ogImage?: string;
}

const HubPage: WithPageLayout<InsightPageProps> = ({ insight, pageName, ogImage }: InsightPageProps) => {
  const repositories = insight.repos.map((repo) => repo.repo_id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  const title = `${insight.name} | Open Sauced Insights Hub`;

  useEffect(() => {
    HubPage.updateSEO!({
      title: title,
    });
  }, [title]);

  if (!hydrated) {
    return (
      <>
        <SEO
          title={`${insight.name} | Open Sauced Insights Hub`}
          description={`${insight.name} Insights page on OpenSauced`}
          image={ogImage}
          twitterCard="summary_large_image"
        />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${insight.name} | Open Sauced Insights Hub`}
        description={`${insight.name} Insights page on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
      <Tool tool={changeCapitalization(pageName, true)} repositories={repositories} />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const insightId = ctx.params!["filterName"] as string;
  const pageName = ctx.params!["toolName"] as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightId}`);
  const insight = response.ok ? ((await response.json()) as DbUserInsight) : null;
  let ogImage;

  if (!insight) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const userId = session?.user?.user_metadata.sub as string;
  const isOwner = !!(userId && insight && `${userId}` === `${insight.user?.id}`);

  if (insight && !insight.is_public && !isOwner) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Keeping this here so we are sure the page is not private before we fetch the social card.
  async function fetchSocialCardURL() {
    try {
      const socialCardUrl = `${String(process.env.NEXT_PUBLIC_OPENGRAPH_URL ?? "")}/insights/${insightId}`;
      const ogReq = await fetch(`${socialCardUrl}/metadata`); //status returned: 204 or 304 or 404
      if (ogReq.status !== 204) {
        fetch(socialCardUrl, {
          method: "HEAD",
        }); // trigger the generation of the social card
      }
      ogImage = ogReq.headers.get("x-amz-meta-location");
      console.log(ogImage);
    } catch (e) {
      // This is to prevent the page from crashing if the social card is not generated for some reasons.
      ogImage = "";
      console.error(e);
    }
  }

  // Runs the data fetching in parallel. Decreases the loading time by 50%.
  await fetchSocialCardURL();

  return {
    props: {
      insight,
      pageName,
      ogImage,
    },
  };
};

HubPage.PageLayout = HubPageLayout;

export default HubPage;
