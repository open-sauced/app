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
  const range = searchParams.get("range");
  console.dir({ workspaceName, baseApiUrl });

  const response = await fetch(new URL(`${baseApiUrl}/workspaces/${workspaceId}/stats?range=${range}`, baseApiUrl));
  const repoStats = (await response.json()) as Record<string, Record<string, number>>;
  console.dir(repoStats);

  if (!workspaceName) {
    return new Response("A workspace name must be specified", { status: 404 });
  }

  const logoImg = getLocalAsset(new URL("/assets/card/logo.png", req.url));
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
          position: "relative",
          border: "2px solid #fff",
          borderRadius: "32px",
          background: "#11181C",
          width: "100%",
          height: "100%",
          padding: "1rem",
          paddingLeft: "2rem",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element  */}
          <img
            alt="Open Sauced Logo"
            width="48"
            height="48"
            // @ts-ignore
            src={logoImgData}
          />
          <p style={{ fontSize: "36px", color: "white" }}>OpenSauced</p>
        </div>
        <div style={{ fontSize: "36px", fontWeight: 700 }}>{workspaceName}</div>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            listStyle: "none",
            fontSize: "24px",
          }}
        >
          {Object.entries(repoStats).map(([key, value]) => {
            return (
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  gap: "1rem",
                  textTransform: "uppercase",
                }}
                key={key}
              >
                <p style={{ fontWeight: "900", textDecoration: "underline" }}>{key.replace("_", " ")}</p>
                <ul style={{ display: "flex", gap: "1rem", textTransform: "uppercase" }}>
                  {Object.entries(value)
                    .filter(([k]) => k !== "health")
                    .map(([k, v]) => {
                      console.log("url", `${new URL(getActivityRatio(Math.round(v)), req.url)}`);

                      return (
                        <li key={k} style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                          <span>{(k === "repos" ? "repositories" : k).replace("_", " ")}:</span>
                          <span>
                            {k === "activity_ratio" ? (
                              <img
                                width="273"
                                height="63"
                                src={`${new URL(
                                  `/assets/og-images/workspaces/${getActivityRatio(Math.round(v))}-activity.png`,
                                  req.url
                                )}`}
                              />
                            ) : (
                              Math.round(v)
                            )}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
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
