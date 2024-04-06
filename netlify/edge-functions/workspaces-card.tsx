import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

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

function getOrgUsernameAvatar(username: string, size = 25.2) {
  return `https://www.github.com/${username}.png?size=${size}`;
}

const getActivityRatio = (total?: number) => {
  if (total === undefined) {
    return "-";
  }

  if (total > 7) {
    return "high";
  }

  if (total >= 4 && total <= 7) {
    return "mid";
  }

  return "low";
};

export default async function handler(req: Request) {
  const { searchParams, pathname } = new URL(req.url);
  const workspaceName = searchParams.get("wname");
  const workspaceDescription =
    (searchParams.get("description") ?? "").length > 0 ? searchParams.get("description") : "&nbsp;";
  const [workspaceId, range = 30] = pathname.split("/").slice(-2);

  const [repoStatsResponse, workspaceReposResponse] = await Promise.all([
    fetch(new URL(`${baseApiUrl}/workspaces/${workspaceId}/stats?range=${range}`, baseApiUrl)),
    fetch(new URL(`${baseApiUrl}/workspaces/${workspaceId}/repos?range=${range}&limit=3`, baseApiUrl)),
  ]);

  const repoStats = (await repoStatsResponse.json()) as Record<string, Record<string, number>>;
  const workspaceRepos = (await workspaceReposResponse.json()) as Record<string, string>[];
  const restOfReposCount = workspaceRepos.meta.itemCount < 4 ? 0 : workspaceRepos.meta.itemCount - 3;
  const workspaceReposNames = workspaceRepos.data.slice(0, 3).map(({ repo }) => repo.full_name);

  if (!workspaceName) {
    return new Response("A workspace name must be specified", { status: 404 });
  }

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
            {workspaceReposNames.map((fullRepoName) => {
              const [orgUsername, repoName] = fullRepoName.split("/");

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
            <li>{restOfReposCount > 0 ? `+${humanizeNumber(restOfReposCount)}` : ""}</li>
          </ul>
        </div>
        <div
          style={{
            marginTop: "113.5px",
            fontSize: "84px",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "101.66px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {workspaceName}
        </div>
        <div
          style={{
            marginTop: "11.5px",
            fontSize: "32px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: workspaceDescription === "&nbsp;" ? "transparent" : undefined,
          }}
        >
          {workspaceDescription}
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
              <img style={statIconStyles} src={`${new URL(`/assets/og-images/workspaces/git-merge.png`, req.url)}`} />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(repoStats.pull_requests.merged)}</span>
                </span>
                <span style={statSubTextStyles}>Merged PRs</span>
              </span>
            </li>
            <li style={statContainerStyles}>
              <img
                style={statIconStyles}
                src={`${new URL(`/assets/og-images/workspaces/issue-closed.png`, req.url)}`}
              />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(repoStats.issues.closed)}</span>
                </span>
                <span style={statSubTextStyles}>Closed Issues</span>
              </span>
            </li>
            <li style={statContainerStyles}>
              <img
                style={{ ...statIconStyles, width: 33.3 }}
                src={`${new URL(`/assets/og-images/workspaces/star.png`, req.url)}`}
              />
              <span style={statTextContainerStyles}>
                <span style={statValueContainerStyles}>
                  <span style={statValueStyles}>{humanizeNumber(repoStats.repos.stars)}</span>
                </span>
                <span style={statSubTextStyles}>Stars</span>
              </span>
            </li>
          </ul>
        </div>
        <img
          style={{
            position: "absolute",
            bottom: "65px",
            right: "62px",
            width: 181,
            height: 42,
          }}
          src={`${new URL(
            `/assets/og-images/workspaces/${getActivityRatio(Math.round(repoStats.repos.activity_ratio))}-activity.png`,
            req.url
          )}`}
        />
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
  path: "/og-images/workspace/:workspaceId/:range",
  cache: "manual",
};
