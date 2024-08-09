import React from "react";
import { ImageResponse } from "og_edge";
import type { Config } from "https://edge.netlify.com";
import { getLocalAsset, getActivityRatio } from "../og-image-utils.ts";

const MAX_ABOUT_LENGTH = 77;
const baseApiUrl = Deno.env.get("NEXT_PUBLIC_API_URL");

function getTopPercent(oscr: number) {
  switch (true) {
    case oscr >= 250:
      return 1;
    case oscr >= 235:
      return 2;
    case oscr >= 225:
      return 3;
    case oscr >= 215:
      return 4;
    case oscr >= 200:
      return 5;
    default:
      return "";
  }
}
function differenceInDays(dateLeft, dateRight) {
  // Convert both dates to milliseconds
  const dateLeftMs = dateLeft.getTime();
  const dateRightMs = dateRight.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(dateLeftMs - dateRightMs);

  // Convert the difference to days
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return days;
}

const getContributorPullRequestVelocity = (repositoryPullRequests: any[]) => {
  const mergedPRs = repositoryPullRequests.filter((prState) => prState.pr_is_merged);

  const totalDays = mergedPRs.reduce((total, event) => {
    const daysBetween = differenceInDays(new Date(event.pr_closed_at), new Date(event.pr_created_at));
    return (total += daysBetween);
  }, 0);

  const averageVelocity = mergedPRs.length > 0 ? totalDays / mergedPRs.length : undefined;

  if (averageVelocity && averageVelocity < 1) {
    return 1;
  }

  return averageVelocity ? Math.floor(averageVelocity) : averageVelocity;
};

const getPullRequestsHistogramToDays = (pull_requests: any[], range = 30) => {
  const graphDays = pull_requests.reduce((days: { [name: string]: number }, curr: any) => {
    const day = differenceInDays(new Date(), new Date(curr.bucket));

    if (days[day]) {
      days[day] += curr.prs_count;
    } else {
      days[day] = curr.prs_count;
    }

    return days;
  }, {});

  const days: any[] = [];

  for (let d = range; d >= 0; d--) {
    days.push({ x: d, y: graphDays[d] || 0 });
  }

  return days;
};

const CrownIcon = () => {
  return (
    <svg
      stroke="#fb8405"
      fill="#fb8405"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="20px"
      width="20px"
      style={{ marginTop: "-1.5px" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
    </svg>
  );
};

const GlobeIcon = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="currentColor"
      stroke="#fb8405"
      style={{ marginTop: "-1.45px" }}
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0 0 10.22 8.75Zm4.44-1.5a9.64 9.64 0 0 0-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 0 0-.857 1.215A9.64 9.64 0 0 0 5.78 7.25Zm-5.944 1.5H1.543a6.507 6.507 0 0 0 4.666 5.5c-.123-.181-.24-.365-.352-.552-.715-1.192-1.437-2.874-1.581-4.948Zm-2.733-1.5h2.733c.144-2.074.866-3.756 1.58-4.948.12-.197.237-.381.353-.552a6.507 6.507 0 0 0-4.666 5.5Zm10.181 1.5c-.144 2.074-.866 3.756-1.58 4.948-.12.197-.237.381-.353.552a6.507 6.507 0 0 0 4.666-5.5Zm2.733-1.5a6.507 6.507 0 0 0-4.666-5.5c.123.181.24.365.353.552.714 1.192 1.436 2.874 1.58 4.948Z"></path>
    </svg>
  );
};

const ArrowTrendingUpIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      color={color}
      style={{ width: "16px", height: "16px" }}
    >
      <path
        fill-rule="evenodd"
        d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

const MinusSmallIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      color={color}
      style={{ width: "16px", height: "16px" }}
    >
      <path
        fill-rule="evenodd"
        d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

const ArrowTrendingDownIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      color={color}
      style={{ width: "16px", height: "16px" }}
    >
      <path
        fill-rule="evenodd"
        d="M1.72 5.47a.75.75 0 011.06 0L9 11.69l3.756-3.756a.75.75 0 01.985-.066 12.698 12.698 0 014.575 6.832l.308 1.149 2.277-3.943a.75.75 0 111.299.75l-3.182 5.51a.75.75 0 01-1.025.275l-5.511-3.181a.75.75 0 01.75-1.3l3.943 2.277-.308-1.149a11.194 11.194 0 00-3.528-5.617l-3.809 3.81a.75.75 0 01-1.06 0L1.72 6.53a.75.75 0 010-1.061z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  const [interSemiBoldFontData, userResponse, prHistorgramRequest, contributorPrDataRequest] = await Promise.all([
    getLocalAsset(new URL("/assets/card/Inter-SemiBold.ttf", req.url)),
    fetch(`${baseApiUrl}/users/${username}`, {
      headers: {
        accept: "application/json",
      },
    }),
    fetch(`${baseApiUrl}/histogram/pull-requests?contributor=${username}&orderDirection=ASC&range=30&width=1`, {
      headers: {
        accept: "application/json",
      },
    }),
    fetch(`${baseApiUrl}/users/${username}/prs?limit=50&range=30`, {
      headers: {
        accept: "application/json",
      },
    }),
  ]);

  const prHistogramData = await prHistorgramRequest.json();
  const { data: contributorPRData } = await contributorPrDataRequest.json();
  const chartData: any[] = getPullRequestsHistogramToDays(prHistogramData, 30);
  const openedPrs = chartData.reduce((total, curr) => total + curr.y, 0);

  const userData = await userResponse.json();
  const { oscr: rawOscr, devstats_updated_at, bio } = userData;
  const about: string = bio ?? "";
  const oscr = devstats_updated_at !== "1970-01-01 00:00:00+00Z" ? Math.ceil(rawOscr) : "-";
  const prVelocity = getContributorPullRequestVelocity(contributorPRData); // e.g. 13d
  const activityRatio = 999;
  const activityText = getActivityRatio(Math.round(activityRatio));
  const activityBgColor = activityText === "high" ? "#dff3df" : activityText === "mid" ? "#fde68a" : "#f1f3f5";
  const activityTextColor = activityText === "high" ? "#297c3b" : activityText === "mid" ? "#b45309" : "#687076";

  const topPercent = oscr === "-" ? "" : getTopPercent(oscr);

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
        <span style={{ position: "absolute", top: "87px", left: "686px", color: "#fff" }}>{username}</span>
        <span
          style={{
            position: "absolute",
            top: "137px",
            left: "641px",
            maxWidth: "285px",
            wordWrap: "break-word",
            wordBreak: "break-all",
            textAlign: "justify",
          }}
        >
          {about.length > MAX_ABOUT_LENGTH ? about.slice(0, MAX_ABOUT_LENGTH).trim() + "..." : bio}
        </span>
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
        {topPercent === "" ? null : (
          <span
            style={{
              position: "absolute",
              color: "#fff",
              top: "446px",
              left: "327px",
              width: "148px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #fb8405",
              borderRadius: "9999px",
              paddingTop: "6px",
              paddingBottom: "6px",
              paddingLeft: "8px",
              paddingRight: "8px",
              gap: topPercent < 4 ? "5px" : "6px",
            }}
          >
            {topPercent < 4 ? <CrownIcon /> : <GlobeIcon />}
            <span>In the top {topPercent}%</span>
          </span>
        )}
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
          {prVelocity}d
        </span>
        <div
          style={{
            position: "absolute",
            top: "254px",
            left: "778px",
            width: "148px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              height: 22,
              borderRadius: "9999px",
              backgroundColor: activityBgColor,
              color: activityTextColor,
              fontSize: "14px",
              paddingTop: "6px",
              paddingBottom: "6px",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            {activityText === "high" ? <ArrowTrendingUpIcon color={activityTextColor} /> : null}
            {activityText === "mid" ? <MinusSmallIcon color={activityTextColor} /> : null}
            {activityText === "low" ? <ArrowTrendingDownIcon color={activityTextColor} /> : null}
            <span style={{ textTransform: "capitalize" }}>{activityText}</span>
          </div>
        </div>
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
