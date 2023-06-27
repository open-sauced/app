import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { getAvatarByUsername } from "lib/utils/github";
import { fetchContributorPRs } from "lib/hooks/api/useContributorPullRequests";
import { getRepoList } from "lib/hooks/useRepoList";

/**
 * @params {string} username - username for the requested user
 * @params {number} w - Width of the card
 */
  

export const config = {
  runtime: "edge",
};

const ASPECT_RATIO = 245 / 348;
const BASE_WIDTH = 245;
const DEFAULT_WIDTH = 735;
const MAX_WIDTH = 1960;

// Make sure the font exists in the specified path:
const logoImg = fetch(new URL("../../img/openSauced-icon.png", import.meta.url)).then((res) => res.arrayBuffer());
const interSemiBoldFont = fetch(new URL("../../font/Inter-SemiBold.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);
const interBlackFont = fetch(new URL("../../font/Inter-Black.ttf", import.meta.url)).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("A username must be specified", { status: 403 });
  }

  const requestedWidth = Number.parseInt(searchParams.get("w") ?? "0", 10) || DEFAULT_WIDTH;

  const width = Math.min(requestedWidth, MAX_WIDTH);
  const height = width / ASPECT_RATIO;
  const avatarURL = getAvatarByUsername(username, 600);

  function size(size: number) {
    return size * (width / BASE_WIDTH);
  }

  const bufferSize = size(50);

  const [
    interSemiBoldFontData,
    interBlackFontData,
    logoImgData,
    prReq,
  ] = await Promise.all([
    interSemiBoldFont,
    interBlackFont,
    logoImg,
    fetchContributorPRs(username, undefined, "*", [], 100)
  ]);

  const { data: prData } = prReq; 
  const prs = prData.length;
  const contributions = getRepoList(Array.from(new Set(prData.map((prData) => prData.full_name))).join(",")).length;

  return new ImageResponse(
    (
      <div
        tw="flex"
        style={{
          fontFamily: "\"Inter\"",
          fontSize: size(16),
          fontWeight: 700,
          paddingBottom: bufferSize,
          paddingLeft: bufferSize,
          paddingRight: bufferSize,
        }}
      >
        <div
          tw="flex relative items-stretch overflow-hidden border-white"
          style={{
            width,
            height,
            borderRadius: size(16),
            borderWidth: size(2),
            boxShadow: `0px ${size(20)} ${size(30)} -12px rgba(0, 0, 0, 0.25)`,
            background: "#11181C linear-gradient(152.13deg, rgba(217, 217, 217, 0.6) 4.98%, rgba(217, 217, 217, 0.1) 65.85%)",
          }}
        >
          <div tw="flex items-stretch w-full h-full overflow-hidden">
            <div tw="flex flex-col flex-shrink-0 w-full h-full">
              <div
                tw="flex"
                style={{
                  height: "50%",
                  width: "100%",
                  position: "relative",
                  flexShrink: 0,
                  flexGrow: 1,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    left: 0,
                    top: 0,
                  }}
                >
                  <CardSauceBG width={size(245)} height={size(177)} />
                </div>
                <div tw="flex absolute items-center" style={{ left: size(10), top: size(10), height: size(13) }}>
                  {/* eslint-disable-next-line @next/next/no-img-element  */}
                  <img
                    alt="Open Sauced Logo"
                    width={size(13)}
                    height={size(13)}
                    // @ts-ignore
                    src={logoImgData}
                  />
                  <p tw={"text-white"} style={{ fontSize: `${size(8)}px` }}>
                    OpenSauced
                  </p>
                </div>
              </div>
              <div
                tw="flex flex-col relative justify-end items-center text-white"
                style={{ height: "50%", flexShrink: 0, flexGrow: 1, paddingTop: size(40), paddingBottom: size(18) }}
              >
                <div style={{ fontSize: size(14), marginBottom: size(12), fontWeight: 700 }}>{`@${username}`}</div>
                <div tw="flex w-full justify-around">
                  <div tw="flex flex-col text-center items-center">
                    <div tw="flex font-black" style={{ fontSize: size(60) }}>
                      {prs}
                    </div>
                    <div tw="flex" style={{ fontSize: size(12) }}>
                      PRs created
                    </div>
                  </div>
                  <div tw="flex flex-col text-center items-center">
                    <div tw="flex font-black" style={{ fontSize: size(60) }}>
                      {contributions}
                    </div>
                    <div tw="flex" style={{ fontSize: size(12) }}>
                      Contributions
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarURL}
              alt="avatar"
              width={size(116)}
              height={size(116)}
              tw="absolute rounded-full"
              style={{
                border: `${size(2)}px solid #fff`,
                left: "50%",
                top: "50%",
                marginLeft: size(116) * -0.5,
                marginTop: size(116) * -0.8,
              }}
            />
            <div
              tw="flex"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: "2",
                display: "flex",
                mixBlendMode: "hard-light",
                opacity: 0.5,
                background: "linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255,255,255, 0))",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: width + bufferSize * 2,
      height: height + bufferSize,
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

const CardSauceBG = ({ ...props }) => (
  <svg width="245" height="177" viewBox="0 0 245 177" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask
      id="mask0_1_2377"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="245"
      height="177"
    >
      <path d="M0 0H245V177H0V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0_1_2377)">
      <rect width="245" height="177" fill="#FB923C" />
      <ellipse cx="240.5" cy="43.9911" rx="115.5" ry="119.553" fill="url(#paint0_radial_1_2377)" />
      <ellipse cx="-22.5002" cy="16.5613" rx="115.5" ry="92.1228" fill="url(#paint1_radial_1_2377)" />
      <ellipse cx="-22.5002" cy="16.5613" rx="115.5" ry="92.1228" fill="url(#paint2_radial_1_2377)" />
      <ellipse cx="-22.5002" cy="16.5613" rx="115.5" ry="92.1228" fill="url(#paint3_radial_1_2377)" />
      <ellipse cx="47.5002" cy="-69.8683" rx="115.5" ry="119.553" fill="url(#paint4_radial_1_2377)" />
      <ellipse cx="47.5002" cy="-69.8683" rx="115.5" ry="119.553" fill="url(#paint5_radial_1_2377)" />
      <ellipse cx="47.5002" cy="-69.8683" rx="115.5" ry="119.553" fill="url(#paint6_radial_1_2377)" />
      <ellipse cx="143.5" cy="-38.8155" rx="115.5" ry="119.553" fill="url(#paint7_radial_1_2377)" />
      <ellipse
        cx="116.1"
        cy="58.1973"
        rx="116.1"
        ry="58.1973"
        transform="matrix(0.919373 0.393386 -0.370884 0.928679 -71.6555 7.41211)"
        fill="url(#paint8_radial_1_2377)"
      />
      <path
        opacity="0.9"
        d="M29.4223 163.067C18.5765 163.067 5.28833 84.6448 0 45.4337V177.513H246.051V22.7326C240.859 14.8216 227.937 -0.794017 217.783 0.0314786C205.091 1.06335 204.803 72.2623 191.534 74.3261C178.265 76.3898 166.727 171.322 156.054 171.322C145.381 171.322 138.458 123.856 125.766 123.856C113.074 123.856 101.247 45.4337 92.3054 45.4337C83.3633 45.4337 66.056 97.0272 53.9409 98.0591C41.8259 99.091 42.9797 163.067 29.4223 163.067Z"
        fill="url(#paint9_linear_1_2377)"
      />
      <path
        d="M0 45.7151C5.28833 85.1689 18.5765 164.077 29.4223 164.077C42.9797 164.077 41.8259 99.7045 53.9409 98.6663C66.056 97.628 83.3633 45.7151 92.3054 45.7151C101.247 45.7151 113.074 124.623 125.766 124.623C138.458 124.623 145.381 172.383 156.054 172.383C166.727 172.383 178.265 76.8628 191.534 74.7863C204.803 72.7098 205.091 1.06993 217.783 0.0316735C227.937 -0.798933 240.859 14.9134 246.051 22.8734"
        stroke="#ED5F00"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(240.5 43.9911) rotate(90) scale(119.553 115.5)"
      >
        <stop stop-color="#F76808" />
        <stop offset="1" stop-color="#F76808" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-22.5002 16.5613) rotate(90) scale(92.1228 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-22.5002 16.5613) rotate(90) scale(92.1228 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint3_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-22.5002 16.5613) rotate(90) scale(92.1228 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint4_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(47.5002 -69.8683) rotate(90) scale(119.553 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint5_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(47.5002 -69.8683) rotate(90) scale(119.553 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint6_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(47.5002 -69.8683) rotate(90) scale(119.553 115.5)"
      >
        <stop stop-color="#C21700" />
        <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint7_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(143.5 -38.8155) rotate(90) scale(119.553 115.5)"
      >
        <stop stop-color="#F76808" />
        <stop offset="1" stop-color="#F76808" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="paint8_radial_1_2377"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(116.1 58.1973) rotate(90) scale(58.1973 116.1)"
      >
        <stop stop-color="#F76808" />
        <stop offset="1" stop-color="#F76808" stop-opacity="0" />
      </radialGradient>
      <linearGradient
        id="paint9_linear_1_2377"
        x1="123"
        y1="208.57"
        x2="123"
        y2="99.886"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#ED6D30" />
        <stop offset="1" stop-color="white" />
      </linearGradient>
    </defs>
  </svg>
);
