"use client";

import Image from "next/image";
import cntl from "cntl";
import { useEffect, useRef, useState } from "react";
import { useMouse } from "react-use";
import { ArrowTrendingUpIcon, MinusSmallIcon, ArrowSmallUpIcon, ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import Button from "components/atoms/Button/button";
import Pill, { PillProps } from "components/atoms/Pill/pill";
import Icon from "components/atoms/Icon/icon";
import CardSauceBGSVG from "img/card-sauce-bg.svg";
import openSaucedImg from "img/openSauced-icon.png";
import PRIcon from "img/icons/pr-icon.svg";
import { getRelativeDays } from "lib/utils/date-utils";

type Activity = "high" | "mid";

export interface DevCardProps {
  username: string;
  name?: string;
  avatarURL: string;
  prs?: number;
  contributions?: number;
  bio?: string;
  prVelocity?: number;
  prMergePercentage?: number;
  isLoading?: boolean;
  isFlipped?: boolean;
  isInteractive?: boolean;
  age?: number;
  onFlip?: () => void;
}

const card = cntl`
  DevCard-card
  relative
  rounded-3xl
`;

const face = cntl`
  flex
  items-stretch
  justify-stretch
  w-full
  h-full
  left-0
  top-0
  overflow-hidden
  absolute
  rounded-3xl
  border-white
  border-[2px]
`;

function getActivity(prs: number): Activity {
  if (prs > 4) {
    return "high";
  } else {
    return "mid";
  }
}

export default function DevCard(props: DevCardProps) {
  const ref = useRef(null);
  const { docX, docY, posX, posY, elW, elH } = useMouse(ref);
  const [isFlipped, setIsFlipped] = useState(props.isFlipped ?? false);
  const isInteractive = props.isInteractive ?? true;

  const activity = getActivity(props.prs ?? 0);

  useEffect(() => {
    setIsFlipped(props.isFlipped ?? false);
  }, [props.isFlipped]);

  useEffect(() => {
    if (!props.isInteractive) {
      setIsFlipped(props.isFlipped ?? false);
    }
  }, [props.isInteractive, props.isFlipped]);

  const halfWidth = elW / 2;
  const halfHeight = elH / 2;
  const elCenterX = posX + halfWidth;
  const elCenterY = posY + halfHeight;
  const mouseOffsetX = isInteractive ? elCenterX - docX : 0;
  const mouseOffsetY = isInteractive ? elCenterY - docY : 0;
  // Cap the offset so that it asymptomatically approaches the max offset

  const calcAngleX = asymptoticLinear(mouseOffsetX / 20, 20, 0.1) + (isFlipped ? 180 : 0);
  const calcAngleY = asymptoticLinear(mouseOffsetY / 40, 20, 0.1);

  const glareX = (1 - mouseOffsetX / elW) * 100;
  const glareY = (1 - mouseOffsetY / elH) * 100;
  const calcShadowX = asymptoticLinear((mouseOffsetX - halfWidth) / 12, 20, 0.1);
  const calcShadowY = asymptoticLinear((mouseOffsetY - halfHeight) / 24, 20, 0.1);

  const glareStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 2,
    mixBlendMode: "hard-light",
    opacity: 0.5,
    transform: "translateZ(80px)",
    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgb(199 198 243), transparent)`,
  };

  const profileHref = `/user/${props.username}`;

  function handleCardClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    // flip the card if the click is not on the button
    if (!(event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement)) {
      if (props.isFlipped === undefined) {
        setIsFlipped(!isFlipped);
      } else {
        props.onFlip?.();
      }
    }
  }

  return (
    <div
      onClick={handleCardClick}
      style={{
        cursor: "pointer",
        perspective: "1000px",
        width: "245px",
        height: "348px",
      }}
      ref={ref}
    >
      <div
        className={card}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          boxShadow: `${-calcShadowX}px ${-calcShadowY}px 50px -12px rgba(0, 0, 0, 0.25)`,
          transform: `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg)`,
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow",
        }}
      >
        <div
          className={`DevCard-front ${face}`}
          style={{
            background:
              "#11181C linear-gradient(152.13deg, rgba(217, 217, 217, 0.6) 4.98%, rgba(217, 217, 217, 0.1) 65.85%)",
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          <div className="grid grid-rows-2 grid-cols-1 flex-shrink-0 w-full h-full">
            <div
              className="DevCard-top"
              style={{
                backgroundImage: `url(${CardSauceBGSVG.src})`,
              }}
            >
              <div className=" absolute left-[10px] top-[10px] flex items-center gap-1 cursor-pointer">
                <Image className="rounded" alt="Open Sauced Logo" width={13} height={13} src={openSaucedImg} />
                <p className={"font-semibold text-white"} style={{ fontSize: "8px" }}>
                  OpenSauced
                </p>
              </div>
            </div>
            <div className="DevCard-bottom relative text-white flex flex-col items-center pt-10">
              {!props.isLoading && (
                <div className="absolute right-[8px] top-[8px]">
                  <ActivityPill activity={activity} />
                </div>
              )}
              <div className="text-sm mb-3 font-semibold">@{props.username}</div>
              <div className="w-full flex justify-center gap-6">
                <div className="text-center">
                  <div className="text-6xl font-black">{props.isLoading ? "-" : props.prs}</div>
                  <div className="text-xs">PRs created</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-black">{props.isLoading ? "-" : props.contributions}</div>
                  <div className="text-xs">Contributions</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "absolute top-1/2 left-1/2 bg-white border-white border-2 block rounded-full w-28 h-28 text-transparent overflow-hidden"
            )}
            style={{ transform: "translate(-50%, -75%)" }}
          >
            <Image src={props.avatarURL} alt="avatar" width={116} height={116} />
          </div>
          {isFlipped || !isInteractive ? null : <div className="glare" style={glareStyle} />}
        </div>
        <div
          className={`DevCard-back ${face}`}
          style={{
            background:
              "#11181C linear-gradient(152.13deg, rgba(217, 217, 217, 0.6) 4.98%, rgba(217, 217, 217, 0.1) 65.85%)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="p-2 pt-4 w-full flex flex-col">
            <div
              className="text-white rounded-full w-full bg-[#F98026] mb-2 flex items-center"
              style={{
                boxShadow: "0px 10px 15px -3px rgba(249, 128, 38, 0.1), 0px 4px 6px -2px rgba(249, 128, 38, 0.05);",
              }}
            >
              <Image
                src={props.avatarURL}
                alt="avatar"
                width={36}
                height={36}
                className="border-white border-[2px] block rounded-full mr-2"
              />
              <div className="py-0.5">
                <div className="text-xs font-semibold">{props.name ?? props.username}</div>
                <div className="flex items-center gap-2">
                  {props.prs !== undefined && (
                    <div className="flex items-center">
                      <Icon IconImage={PRIcon} className="w-3 h-3 mr-1" />
                      <div className="flex text-xs">{props.prs} PR</div>
                    </div>
                  )}
                  {props.age !== undefined && (
                    <div className="flex items-center">
                      <GiftIcon className="w-3 h-3 mr-1" />
                      <div className="flex text-xs">
                        {getRelativeDays(props.age)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-300">Activity</div>
                {!props.isLoading ? (
                  <ActivityPill activity={activity} size="small" />
                ) : (
                  <div className="text-xs text-slate-300 font-extralight">-</div>
                )}
              </div>
              <Seperator />
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-300">PRs Velocity</div>
                <div className="flex items-center ml-auto gap-1">
                  {!props.prVelocity || props.prMergePercentage == undefined ? (
                    <div className="text-xs text-slate-300 font-extralight">-</div>
                  ) : (
                    <>
                      <div className="text-xs text-slate-300 font-extralight">{getRelativeDays(props.prVelocity)}</div>
                      <VelocityPill velocity={props.prMergePercentage} size="small" />
                    </>
                  )}
                </div>
              </div>
              <Seperator />
              <div className="text-xs text-slate-300 text-ellipsis">{props.bio}</div>
            </div>
            {/* bottom */}
            <div className="px-2 mt-auto justify-self-end">
              <Link href={profileHref} passHref>
                <Button variant="primary" className="w-full text-center justify-center mt-4 !py-1">
                  View Profile
                </Button>
              </Link>
              <div className="flex justify-center mt-2">
                <Image className="rounded" alt="Open Sauced Logo" width={13} height={13} src={openSaucedImg} />
                <p className={"font-semibold text-white ml-1"} style={{ fontSize: "8px" }}>
                  OpenSauced
                </p>
              </div>
            </div>
          </div>
          {isFlipped ? <div className="glare" style={glareStyle} /> : null}
        </div>
      </div>
    </div>
  );
}

function VelocityPill({ velocity, ...props }: { velocity: number } & Omit<PillProps, "text" | "icon">) {
  const icon =
    velocity > 0 ? <ArrowSmallUpIcon color="purple" className="h-4 w-4" /> : <ArrowSmallDownIcon className="h-4 w-4" />;
  return <Pill color="purple" icon={icon} text={`${velocity}%`} {...props} />;
}

function ActivityPill({ activity, ...props }: { activity: Activity } & Omit<PillProps, "text" | "icon">) {
  const color = activity === "high" ? "green" : "yellow";
  const activityText = activity === "high" ? "High" : "Mid";
  const icon =
    activity === "high" ? (
      <ArrowTrendingUpIcon color="green" className="h-4 w-4" />
    ) : (
      <MinusSmallIcon className="h-4 w-4 text-amber-500" />
    );

  return <Pill color={color} icon={icon} text={activityText} {...props} />;
}

function Seperator() {
  return (
    <div
      className="my-2 h-[1px]"
      style={{ background: "linear-gradient(90deg, hsla(206, 12%, 89%, 0.6), hsla(206, 12%, 89%, 0.01)" }}
    ></div>
  );
}

/**
 * Computes the value of a linear function that asymptotically approaches a capped value.
 *
 * @param {number} value - The input value
 * @param {number} cap - The capped value that the function will never exceed.
 * @param {number} slope - The slope controlling the rate at which the function approaches the cap.
 * @returns {number} The computed value based on the input value, cap, and slope.
 */
function asymptoticLinear(value: number, cap: number, slope: number = 0.1) {
  // Calculate the scale factor to ensure z never exceeds cap
  const scaleFactor = cap / (Math.PI / 2);

  // Use the inverse tangent function to achieve asymptotic behavior
  const asymptoticValue = Math.atan(slope * value);

  // Scale the result and return z
  const z = scaleFactor * asymptoticValue;
  return z;
}
