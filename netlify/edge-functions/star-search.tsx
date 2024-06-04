import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset } from "../og-image-utils.ts";

const MAX_CHARS = 130;

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interFontRegular = getLocalAsset(new URL("/assets/fonts/Inter-Regular.otf", req.url));
  const interFontMedium = getLocalAsset(new URL("/assets/fonts/Inter-Medium.otf", req.url));
  const [interFontRegularData, interFontMediumData, logoImgData] = await Promise.all([
    interFontRegular,
    interFontMedium,
    logoImg,
  ]);

  let imageContents;
  const absTop = 171.5;

  if (!prompt) {
    imageContents = (
      <img src={`${new URL(`/assets/og-images/star-search-og-image.png`, req.url)}`} width="1200" height="630" />
    );
  } else {
    imageContents = (
      <div
        style={{
          position: "relative",
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
          paddingLeft: "43px",
          paddingRight: "43px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: absTop,
            left: 44,
            backgroundImage: `url("${new URL(`/assets/star-search-white.png`, req.url)}")`,
            backgroundSize: "280px 43px",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: absTop + 5,
            left: 343,
            fontFamily: '"Inter Regular"',
            fontSize: "37px",
            letterSpacing: "-2px",
            color: "#FF6B42",
          }}
        >
          Copilot, but for git history
        </div>
        <p
          style={{
            marginTop: absTop + 30,
            fontFamily: '"Inter Medium"',
            fontSize: "54px",
            letterSpacing: "-2px",
            overflow: "hidden",
            height: "400px",
            maxHeight: "400px",
          }}
        >
          {prompt.length > MAX_CHARS ? `${prompt.slice(0, MAX_CHARS)}...` : prompt}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element  */}
        <img
          width="185"
          height="32"
          // @ts-ignore
          src={logoImgData}
          style={{
            position: "absolute",
            bottom: "39px",
            right: "43px",
          }}
        />
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
        name: "Inter Regular",
        data: interFontRegularData,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter Medium",
        data: interFontMediumData,
        weight: 500,
        style: "medium",
      },
    ],
  });
}

export const config: Config = {
  path: "/og-images/star-search/",
  cache: "manual",
};
