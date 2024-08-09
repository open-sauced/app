import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset, getOrgUsernameAvatar, humanizeNumber } from "../og-image-utils.ts";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  const [interSemiBoldFontData, userResponse] = await Promise.all([
    getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url)),
    fetch(`${baseApiUrl}/users/${username}`, {
      headers: {
        accept: "application/json",
      },
    }),
  ]);

  const userData = await userResponse.json();
  const { oscr: rawOscr, devstats_updated_at } = userData;
  const oscr = devstats_updated_at !== "1970-01-01 00:00:00+00Z" ? Math.ceil(rawOscr) : "-";
  const openedPrs = 999;
  const prVelocity = "10d";

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Inter"',
          color: "#d7d8d9",
          display: "flex",
          flexDirection: "column",
          fontSize: "1rem",
          fontWeight: 700,
          backgroundImage: `url("${new URL(`/assets/og-images/dev-card-background.png`, req.url)}")`,
          backgroundSize: "1200px 630px",
          width: "100%",
          height: "100%",
          padding: "62px",
        }}
      >
        <img
          src={`https://www.github.com/${username}.png?size=460`}
          style={{
            borderRadius: "50%",
            width: "153px",
            aspectRatio: "1/1",
            position: "absolute",
            top: "110px",
            left: "324px",
          }}
        />

        <img
          src={`https://www.github.com/${username}.png?size=49`}
          style={{
            borderRadius: "50%",
            width: "49px",
            aspectRatio: "1/1",
            position: "absolute",
            top: "71px",
            left: "629px",
          }}
        />
        <span style={{ position: "absolute", top: "87px", left: "686px" }}>{username}</span>
        <span
          style={{
            position: "absolute",
            fontSize: "84px",
            color: "#fff",
            top: "310px",
            left: "327px",
            width: "148px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {oscr}
        </span>
        <span
          style={{
            position: "absolute",
            top: "295px",
            left: "778px",
            width: "148px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {openedPrs}
        </span>
        <span
          style={{
            position: "absolute",
            top: "335px",
            left: "778px",
            width: "148px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {prVelocity}
        </span>
      </div>
    ),
    {
      width: "1200px",
      height: "630px",
      headers: {
        // cache for 2 hours
        "Cache-Control": "public, max-age=0, stale-while-revalidate",
        "Netlify-CDN-Cache-Control": "public, max-age=0, stale-while-revalidate=7200",
        "Netlify-Vary": "query=username",
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
    }
  );
}

export const config: Config = {
  path: "/og-images/dev-card",
  cache: "manual",
};
