import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

type StatsType<T = "stars" | "forks"> = T extends "stars"
  ? { star_count: number; bucket: string }
  : { forks_count: number; bucket: string };

function humanizeNumber(num: number | string, type: "comma" | "abbreviation" | null = null) {
  const number = typeof num !== "number" ? parseFloat(num) : num;
  const abs = Math.abs(number);
  const sign = Math.sign(number);
  const commaConverted = abs > 999 ? `${((sign * abs) / 1000).toFixed(3).replace(".", ",")}` : `${sign * abs}`;
  const abbreviated = abs > 999 ? `${((sign * abs) / 1000).toFixed(1)}k` : `${sign * abs}`;

  return type === "comma" ? commaConverted : abbreviated;
}

function getLocalAsset(url: URL): Promise<ArrayBuffer> {
  return fetch(url).then((res) => res.arrayBuffer());
}

function getOrgUsernameAvatar(username: string, size) {
  return `https://www.github.com/${username}.png?size=${size}`;
}

function getStatTotal<T extends "stars" | "forks">(stats: StatsType<T>[], variant: T) {
  const countProperty = variant === "stars" ? "star_count" : "forks_count";
  const seriesData = stats?.map((stat) => stat[countProperty] ?? 0) ?? [];
  const total = seriesData?.reduce((stat, currentValue) => (stat || 0) + (currentValue || 0), 0);

  return total;
}

export default async function handler(req: Request) {
  const { searchParams, pathname } = new URL(req.url);
  const repoDescription =
    (searchParams.get("description") ?? "").length > 0 ? searchParams.get("description") : "&nbsp;";
  const [org, repoName, range = 30] = pathname.split("/").slice(-3);
  const query = new URLSearchParams();
  query.set("repo", `${org}/${repoName}`);
  query.set("range", `${range}`);
  query.set("orderDirection", "ASC");

  const [starStatsResponse, forkStatsResponse] = await Promise.all([
    fetch(new URL(`${baseApiUrl}/histogram/stars?${query}`, baseApiUrl)),
    fetch(new URL(`${baseApiUrl}/histogram/forks?${query}`, baseApiUrl)),
  ]);

  const [starsStats, forksStats] = await Promise.all([starStatsResponse.json(), forkStatsResponse.json()]);

  const starCount = getStatTotal(starsStats, "stars");
  const forkCount = getStatTotal(forksStats, "forks");

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interSemiBoldFont = getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url));

  const [interSemiBoldFontData, logoImgData] = await Promise.all([interSemiBoldFont, logoImg]);

  const statContainerStyles = {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  };

  const statIconStyles = {
    width: 32,
    height: 32,
  };

  const statTextContainerStyles = {
    position: "relative",
    top: "2px",
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
  };

  const statValueContainerStyles = {
    overflow: "hidden",
    position: "relative",
    maxHeight: "42px",
  };

  const statValueStyles = {
    position: "relative",
    top: "2px",
    fontSize: "42px",
    fontWeight: 700,
  };

  const statSubTextStyles = {
    position: "relative",
    top: "3px",
    fontSize: "24px",
    fontWeight: 500,
    color: "#C7C7C7",
  };

  return new ImageResponse(
    (
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
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "113.5px",
            fontSize: "44px",
            letterSpacing: "-2px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <img style={{ width: 64, height: 64 }} src={getOrgUsernameAvatar(org, 64)} />
          <div style={{ display: "flex", flexWrap: "wrap", width: "995px" }}>
            <span style={{ fontWeight: 400 }}>{org}/</span>
            <span style={{ fontWeight: 700 }}>{repoName}</span>
          </div>
        </div>
        <div
          style={{
            marginTop: "11.5px",
            fontSize: "28px",
            color: repoDescription === "&nbsp;" ? "transparent" : undefined,
          }}
        >
          {repoDescription}
        </div>
        <p style={{ marginTop: "94px", fontSize: "26px", fontWeight: 500 }}>Past {range} days</p>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              display: "flex",
              gap: "20px",
              listStyle: "none",
              alignItems: "baseline",
            }}
          >
            <li style={statContainerStyles}>
              <img
                style={{ ...statIconStyles, width: 33.3 }}
                src={`${new URL(`/assets/og-images/workspaces/star.png`, req.url)}`}
              />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(starCount)}</span>
                </span>
                <span style={statSubTextStyles}>Forks</span>
              </span>
            </li>
            <li style={statContainerStyles}>
              <img
                style={{ ...statIconStyles, width: 33.3 }}
                src={`${new URL(`/assets/og-images/repo-forked.png`, req.url)}`}
              />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(forkCount)}</span>
                </span>
                <span style={statSubTextStyles}>Stars</span>
              </span>
            </li>
          </ul>
        </div>
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

export const config: Config = {
  path: "/og-images/repository/:org/:repo/:range",
  cache: "manual",
};
