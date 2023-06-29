import { GetServerSidePropsContext } from "next";

import fetchSocialCard from "lib/utils/fetch-social-card";
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

  // Runs the data fetching in parallel. Decreases the loading time by 50%.
  const [, ogData] = await Promise.allSettled([fetchUserData(), fetchSocialCard(`highlights/${id}`)]);

  ogImage = ogData.status === "fulfilled" ? ogData.value : "";

  return {
    props: { highlight, ogImage },
  };
}
