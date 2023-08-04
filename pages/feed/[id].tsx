import { GetServerSidePropsContext } from "next";

import Feed from "./index";

export default Feed;

export const getServerSideProps = async (context: HighlightSSRPropsContext) => {
  return await handleHighlightSSR(context);
};

export type HighlightSSRPropsContext = GetServerSidePropsContext<{ id: string }>;

export async function handleHighlightSSR({ req, params }: GetServerSidePropsContext<{ id: string }>) {
  const { id } = params!;
  const { referer } = req.headers;

  async function fetchHighlight() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/highlights/${id}`, {
      headers: {
        accept: "application/json",
      },
    });

    if (req.ok) {
      return (await req.json()) as DbHighlight;
    }

    return null;
  }

  const highlight = await fetchHighlight();

  return {
    props: {
      highlight,
      referer: referer ?? null,
    },
  };
}
