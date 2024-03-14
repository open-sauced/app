import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

function getLocalAsset(url: URL): Promise<ArrayBuffer> {
  return fetch(url).then((res) => res.arrayBuffer());
}

const getActivityRatio = (total?: number) => {
  if (total === undefined) {
    return "-";
  }

  if (total > 7) {
    return "high";
  }

  if (total >= 4 && total <= 7) {
    return "medium";
  }

  return "low";
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const workspaceName = searchParams.get("wname");
  const workspaceId = searchParams.get("wid");
  const workspaceDescription = searchParams.get("description");
  const range = searchParams.get("range") ?? "30";

  const response = await fetch(new URL(`${baseApiUrl}/workspaces/${workspaceId}/stats?range=${range}`, baseApiUrl));
  const repoStats = (await response.json()) as Record<string, Record<string, number>>;

  if (!workspaceName) {
    return new Response("A workspace name must be specified", { status: 404 });
  }

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interSemiBoldFont = getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url));
  const interBlackFont = getLocalAsset(new URL("/assets/card/Inter-Black.ttf", req.url));

  const [interSemiBoldFontData, interBlackFontData, logoImgData] = await Promise.all([
    interSemiBoldFont,
    interBlackFont,
    logoImg,
  ]);

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
          paddingTop: "62px",
          paddingLeft: "62px",
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
        <div
          style={{
            marginTop: "119.5px",
            fontSize: "84px",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "101.66px",
          }}
        >
          {workspaceName}
        </div>
        <p style={{ marginTop: "11.5px", fontSize: "32px", fontWeight: 400 }}>{workspaceDescription}</p>
        <p style={{ marginTop: "94px", fontSize: "26px", fontWeight: 500 }}>Past {range} days</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              fontSize: "42px",
              fontWeight: 700,
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <img src={`${new URL(`/assets/og-images/workspaces/git-merge.png`, req.url)}`} />
              <span>
                {repoStats.pull_requests.merged}{" "}
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  Merged PRs
                </span>
              </span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <img src={`${new URL(`/assets/og-images/workspaces/issue-closed.png`, req.url)}`} />
              <span>
                {repoStats.issues.closed}{" "}
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  Closed Issues
                </span>
              </span>
            </li>
            <li
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <img src={`${new URL(`/assets/og-images/workspaces/star.png`, req.url)}`} />
              <span>
                {repoStats.repos.stars}{" "}
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  Stars
                </span>
              </span>
            </li>
          </ul>
          <img
            src={`${new URL(
              `/assets/og-images/workspaces/${getActivityRatio(
                Math.round(repoStats.repos.activity_ratio)
              )}-activity.png`,
              req.url
            )}`}
          />
        </div>
      </div>
    ),
    {
      width: "1200px",
      height: "630px",
      headers: {
        // cache for 1 hour
        "cache-control": "public, s-maxage=3600",
        "content-type": "image/png",
      },
      fonts: [
        {
          name: "Inter",
          data: interSemiBoldFontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBlackFontData,
          weight: 900,
          style: "normal",
        },
      ],
    }
  );
}

export const config: Config = {
  path: "/og-images/workspace",
  cache: "manual",
};
