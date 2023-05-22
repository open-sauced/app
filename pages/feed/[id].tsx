import { GetServerSidePropsContext } from "next";

import Feed from "../feed";

export default Feed;

export const getServerSideProps = async (context: HighlightSSRPropsContext) => {
  return await handleHighlightSSR(context);
};

export type HighlightSSRPropsContext = GetServerSidePropsContext<{ id: string }>;

export async function handleHighlightSSR({ params }: GetServerSidePropsContext<{ id: string }>) {
  const { id } = params!;
  let highlight: DbHighlight | null = null;
  let ogImage;

  async function fetchUserData() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/highlights/${id}`, {
      headers: {
        accept: "application/json",
      },
    });

    if (req.ok) {
      highlight = (await req.json()) as DbHighlight;
    }
  }

  async function fetchSocialCardURL() {
    const socialCardUrl = `${String(process.env.NEXT_PUBLIC_OPENGRAPH_URL ?? "")}/highlights/${id}`;
    const ogReq = await fetch(`${socialCardUrl}/metadata`); //status returned: 204 or 304 or 404
    if (ogReq.status !== 204) {
      fetch(socialCardUrl, {
        method: "HEAD",
      }); // trigger the generation of the social card
    }

    ogImage = ogReq.headers.get("x-amz-meta-location");
  }

  // Runs the data fetching in parallel. Decreases the loading time by 50%.
  await Promise.allSettled([fetchUserData(), fetchSocialCardURL()]);

  return {
    props: { highlight, ogImage },
  };
}
