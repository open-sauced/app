import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
// import { Pill } from "components/Pill.tsx";
import {
  ArrowTrendingUpIcon,
  MinusSmallIcon,
  ArrowTrendingDownIcon,
} from "https://esm.sh/@heroicons/react@2.0.14/24/solid";

interface PillProps {
  children: React.ReactNode;
  color?: "slate" | "green" | "yellow" | "red" | "purple";
}

const Pill = ({ children, color = "slate" }: PillProps) => {
  return (
    <div
      style={{
        backgroundColor:
          color === "green"
            ? "hsl(121 47.5% 91.4% / 1)"
            : color === "yellow"
            ? "rgb(253 230 138 / 1)"
            : color === "red"
            ? "hsl(360 97.9% 94.8% / 1)"
            : color === "purple"
            ? "rgb(233 213 255 / 1)"
            : "hsl(209 12.2% 93.2% / 1)",
        color:
          color === "green"
            ? "hsl(133 50.0% 32.5% / 1)"
            : color === "yellow"
            ? "rgb(180 83 9 / 1)"
            : color === "red"
            ? "hsl(358 65.0% 48.7% / 1)"
            : color === "purple"
            ? "rgb(147 51 234 / 1)"
            : "hsl(206 6.0% 43.5% / 1)",
        borderRadius: "9999px",
        padding: "0.375rem 0.5rem",
      }}
    >
      {children}
    </div>
  );
};

function getLocalAsset(url: URL): Promise<ArrayBuffer> {
  return fetch(url).then((res) => res.arrayBuffer());
}

const getPillChart = (total?: number): React.ReactNode => {
  if (total === undefined) {
    return "-";
  }

  if (total > 7) {
    // icon={<ArrowTrendingUpIcon color="green" className="w-6 h-6 lg:w-4 lg:h-4" />}
    return <Pill color="green">High</Pill>;
  }

  if (total >= 4 && total <= 7) {
    //         icon={
    //   <MinusSmallIcon
    //     color="black"
    //     style={{ background: "#fff", strokeColor: "#fff", width: 24, height: 24, border: "1px solid red" }}
    //   />
    // }

    return <Pill color="yellow">Medium</Pill>;
  }

  // icon={<ArrowTrendingDownIcon color="red" className="w-6 h-6 lg:w-4 lg:h-4" />}
  return <Pill color="red">Low</Pill>;
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const workspaceName = searchParams.get("wname");
  const repositoryStats = searchParams.get("repositoryStats");

  console.log(repositoryStats, workspaceName);

  if (!repositoryStats) {
    return new Response("A repositoryStats must be specified", { status: 404 });
  }

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

  const repoStats = JSON.parse(repositoryStats) as Record<string, Record<string, number>>;

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
          {Object.entries(repoStats).map(([key, value]) => (
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
                  .map(([k, v]) => (
                    <li key={k} style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                      <span>{(k === "repos" ? "repositories" : k).replace("_", " ")}:</span>
                      <span>{k === "activity_ratio" ? getPillChart(Math.round(v)) : Math.round(v)}</span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    ),
    {
      width: "1200px",
      height: "675px",
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
