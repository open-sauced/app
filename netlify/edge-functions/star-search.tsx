import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset } from "../og-image-utils.ts";

const MAX_CHARS = 200;

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interSemiBoldFont = getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url));

  const [interSemiBoldFontData, logoImgData] = await Promise.all([interSemiBoldFont, logoImg]);

  let imageContents;

  if (!prompt) {
    imageContents = (
      <div
        style={{
          fontFamily: '"Inter"',
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          fontSize: "1rem",
          fontWeight: 700,
          backgroundImage: `url("${new URL(`/assets/og-images/star-search-og-image.png`, req.url)}")`,
          backgroundSize: "1200px 630px",
          width: "100%",
          height: "100%",
          padding: "62px",
        }}
      ></div>
    );
  } else {
    imageContents = (
      <div
        style={{
          fontFamily: '"Inter"',
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          fontSize: "1rem",
          fontWeight: 700,
          backgroundImage: `url("${new URL(`/assets/og-images/workspaces/background-1.5.png`, req.url)}")`,
          backgroundSize: "1200px 630px",
          width: "100%",
          height: "100%",
          padding: "62px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element  */}
          <img
            alt="Open Sauced Logo"
            width="185"
            height="32"
            // @ts-ignore
            src={logoImgData}
          />
        </div>
        <p
          style={{
            marginTop: "64px",
            fontSize: "48px",
            overflow: "hidden",
            height: "400px",
            maxHeight: "400px",
          }}
        >
          {prompt.length > MAX_CHARS ? `${prompt.slice(0, MAX_CHARS)}...` : prompt}
        </p>
      </div>
    );
  }

  return new ImageResponse(imageContents, {
    width: "1200px",
    height: "630px",
    headers: {
      // cache for 2 hours
      "Netlify-CDN-Cache-Control": "public, max-age=0, stale-while-revalidate=7200",
      "Netlify-Vary": "query=prompt",
      "content-type": "image/png",
    },

    fonts: [
      {
        name: "Inter",
        data: interSemiBoldFontData,
        weight: 700,
        style: "normal",
      },
    ],
  });
}

export const config: Config = {
  path: "/og-images/star-search/",
  cache: "manual",
};
