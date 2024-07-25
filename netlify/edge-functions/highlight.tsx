import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset, getOrgUsernameAvatar, humanizeNumber } from "../og-image-utils.ts";

const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

export default async function handler(req: Request) {
  const { pathname } = new URL(req.url);
  const [highlightId] = pathname.split("/").slice(-1);

  const [highlightResponse, reactionsResponse] = await Promise.all([
    fetch(new URL(`${baseApiUrl}/user/highlights/${highlightId}`, baseApiUrl)),
    fetch(new URL(`${baseApiUrl}/highlights/${highlightId}/reactions`, baseApiUrl)),
  ]);

  const [highlight, reactions] = await Promise.all([highlightResponse.json(), reactionsResponse.json()]);

  const logoImg = getLocalAsset(new URL("/assets/og-images/workspaces/open-sauced-logo.png", req.url));
  const interSemiBoldFont = getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url));

  const [interSemiBoldFontData, logoImgData] = await Promise.all([interSemiBoldFont, logoImg]);
  const heartIconData = `data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.73649 2.5C3.82903 2.5 1 5.052 1 8.51351C1 12.3318 3.80141 15.5735 6.38882 17.7763C7.70549 18.8973 9.01844 19.7929 10.0004 20.4077C10.4922 20.7157 10.9029 20.9544 11.1922 21.1169C11.4093 21.2388 11.5582 21.318 11.6223 21.3516C11.7407 21.4132 11.8652 21.4527 12 21.4527C12.1193 21.4527 12.2378 21.4238 12.3438 21.3693C12.5003 21.2886 12.6543 21.2031 12.8078 21.1169C13.0971 20.9544 13.5078 20.7157 13.9996 20.4077C14.9816 19.7929 16.2945 18.8973 17.6112 17.7763C20.1986 15.5735 23 12.3318 23 8.51351C23 5.052 20.171 2.5 17.2635 2.5C14.9702 2.5 13.1192 3.72621 12 5.60482C10.8808 3.72621 9.02981 2.5 6.73649 2.5ZM6.73649 4C4.65746 4 2.5 5.88043 2.5 8.51351C2.5 11.6209 4.8236 14.4738 7.36118 16.6342C8.60701 17.6948 9.85656 18.5479 10.7965 19.1364C11.2656 19.4301 11.6557 19.6567 11.9269 19.8091L12 19.85L12.0731 19.8091C12.3443 19.6567 12.7344 19.4301 13.2035 19.1364C14.1434 18.5479 15.393 17.6948 16.6388 16.6342C19.1764 14.4738 21.5 11.6209 21.5 8.51351C21.5 5.88043 19.3425 4 17.2635 4C15.1581 4 13.4627 5.38899 12.7115 7.64258C12.6094 7.94883 12.3228 8.15541 12 8.15541C11.6772 8.15541 11.3906 7.94883 11.2885 7.64258C10.5373 5.38899 8.84185 4 6.73649 4Z' fill='%2324292F'/%3e%3c/svg%3e`;

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
            {highlight.tagged_repos.map((fullRepoName) => {
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
            <li>{highlight.tagged_repos > 0 ? `+${humanizeNumber(highlight.tagged_repos)}` : ""}</li>
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
        >
          <img
            style={{ width: 64, height: 64, borderRadius: "9999px" }}
            src={getOrgUsernameAvatar(highlight.login, 64)}
          />
          <div style={{ display: "flex", flexWrap: "wrap", width: "995px" }}></div>
        </div>
        <div
          style={{
            marginTop: "11.5px",
            fontSize: "48px",
            textOverflow: "ellipsis",
            color: highlight.highlight === "&nbsp;" ? "transparent" : undefined,
          }}
        >
          {highlight.highlight.length > 108 ? `${highlight.highlight.slice(0, 108)}...` : highlight.highlight}
        </div>

        {reactions.length > 0 ? (
          <div
            style={{
              marginTop: "205px",
              display: "flex",
              right: "25px",
            }}
          >
            <img
              style={{
                width: "32px",
                height: "32px",
              }}
              src={heartIconData}
            />
            <span
              style={{
                fontSize: "28px",
                fontWeight: 500,
                marginLeft: "8px",
              }}
            >
              {reactions.length} {reactions.length > 1 ? ` Reactions` : `Reaction`}
            </span>
          </div>
        ) : (
          ""
        )}
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
  path: "/og-images/highlight/:highlightId",
  cache: "manual",
};
