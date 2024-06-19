import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset, getOrgUsernameAvatar, humanizeNumber } from "../og-image-utils.ts";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

export const config: Config = {
  path: "/og-images/lottery-factor/:org/:repo",
  cache: "manual",
};

export default async function handler(req: Request) {
  const { searchParams, pathname } = new URL(req.url);
  const [org, repo] = pathname.split("/").slice(-2);
  const query = new URLSearchParams(searchParams);
  query.set("repos", [`${org}/${repo}`].toString());

  const response = await fetch(`${baseApiUrl}/repos/lotto?${query}`);
  const lotteryFactorData = await response.json();

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interSemiBoldFont = getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url));

  const [interSemiBoldFontData, logoImgData] = await Promise.all([interSemiBoldFont, logoImg]);

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Inter"',
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: 700,
          backgroundColor: "#ff3d00",
          backgroundSize: "1980px 1400px",
          width: "100%",
          height: "100%",
          padding: "62px",
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#000",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "16px",
              letterSpacing: "-1px",
              alignItems: "center",
              width: "100%"
            }}
          >
            <img style={{ width: 24, height: 24 }} src={getOrgUsernameAvatar(org, 24)} />
            <p style={{ fontWeight: 700 }}>
              {org}/{repo}
            </p>
          </div>
          <div
            style={{
              width: "100%"
            }}
          >
            <img
              alt="Open Sauced Logo"
              width="185"
              height="32"
              // @ts-ignore
              src={logoImgData}
            />
          </div>
        </section>

        <main>

        </main>
      </div>
    ),
    {
      width: "1200px",
      height: "630px",
      headers: {
        // cache for 2 hours
        "cache-control": "public, s-maxage=7200",
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
