import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset, getOrgUsernameAvatar, humanizeNumber } from "../og-image-utils.ts";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

export default async function handler(req: Request) {
  const { pathname } = new URL(req.url);
  const [insightId, range = 30] = pathname.split("/").slice(-2);

  const [insightResponse, reposResponse] = await Promise.all([
    fetch(new URL(`${baseApiUrl}/insights/${insightId}?include=none`, baseApiUrl)),
    fetch(new URL(`${baseApiUrl}/insights/${insightId}/repos`, baseApiUrl)),
  ]);

  const [insight, repos] = await Promise.all([insightResponse.json(), reposResponse.json()]);

  const repoStatsResponse = await fetch(
    new URL(
      `${baseApiUrl}/histogram/pull-requests?prev_days_start_date=${range}&range=${range}&repoIds=${repos
        .map((repo) => repo.repo_id)
        .join(",")}`,
      baseApiUrl
    )
  );
  const repoStats = await repoStatsResponse.json();
  console.log(repoStats[0]);
  const prs = repoStats[0].prs_count;
  const velocity = Number(repoStats[0].pr_velocity) >= 1 ? Number(repoStats[0].pr_velocity) : 1;

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
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyle: "none",
              gap: "9.45px",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {repos
              .slice(0, 2)
              .sort((a, b) => a.full_name.localeCompare(b.full_name))
              .map((repo) => {
                const [orgUsername, repoName] = repo.full_name.split("/");

                return (
                  <li
                    key={repoName}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      border: "1px solid #64748B",
                      borderRadius: "6.3px",
                      padding: "6px 8px 6px 6px",
                      color: "#D4D4D4",
                    }}
                  >
                    <img
                      style={{
                        width: 25.2,
                        height: 25.2,
                      }}
                      src={getOrgUsernameAvatar(orgUsername)}
                    />
                    <span>{repoName}</span>
                  </li>
                );
              })}
            <li>{repos.length > 2 ? `+${humanizeNumber(repos.length - 2)}` : ""}</li>
          </ul>
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
        ></div>
        <div
          style={{
            marginTop: "11.5px",
            fontSize: "48px",
            textOverflow: "ellipsis",
            color: insight.name === "&nbsp;" ? "transparent" : undefined,
          }}
        >
          {insight.name.length > 108 ? `Insights: ${insight.name.slice(0, 108)}...` : `Insights: ${insight.name}`}
        </div>
        <p style={{ marginTop: "212px", fontSize: "26px", fontWeight: 500 }}>Past {range} days</p>
        <div
          style={{
            marginTop: "32px",
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
              <img style={statIconStyles} src={`${new URL(`/assets/og-images/workspaces/git-merge.png`, req.url)}`} />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(prs)}</span>
                </span>
                <span style={statSubTextStyles}>Pull Requests</span>
              </span>
              <li style={statContainerStyles}>
                <img style={statIconStyles} src={`${new URL(`/assets/og-images/workspaces/git-merge.png`, req.url)}`} />
                <span style={statTextContainerStyles}>
                  <span style={statValueContainerStyles}>
                    <span style={statValueStyles}>{humanizeNumber(velocity)}</span>
                  </span>
                  <span style={statSubTextStyles}>Day PR Velocity</span>
                </span>
              </li>
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
  path: "/og-images/insight/:insightId/:range",
  cache: "manual",
};
