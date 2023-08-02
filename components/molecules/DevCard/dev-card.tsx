"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowTrendingUpIcon, MinusSmallIcon, ArrowSmallUpIcon, ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import Tilt from "react-parallax-tilt";
import Button from "components/atoms/Button/button";
import Pill, { PillProps } from "components/atoms/Pill/pill";
import Icon from "components/atoms/Icon/icon";
import CardSauceBGSVG from "img/card-sauce-bg.svg";
import openSaucedImg from "img/openSauced-icon.png";
import PRIcon from "img/icons/pr-icon.svg";
import { getRelativeDays } from "lib/utils/date-utils";

export interface DevCardProps {
  username: string;
  name?: string;
  avatarURL: string;
  prs?: number;
  repos?: number;
  bio?: string;
  prVelocity?: number;
  prMergePercentage?: number;
  isLoading?: boolean;
  isFlipped?: boolean;
  isInteractive?: boolean;
  hideProfileButton?: boolean;
  age?: number;
  onFlip?: () => void;
}

export default function DevCard(props: DevCardProps) {
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

  const profileHref = `/user/${props.username}`;

  function handleCardClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isInteractive) {
      return;
    }
    // flip the card if the click is not on the button
    if (!(event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement)) {
      if (props.isFlipped === undefined) {
        setIsFlipped(!isFlipped);
      } else {
        props.onFlip?.();
      }
    }
  }

  const faceClasses = clsx(
    "flex",
    "flex-col",
    "items-stretch",
    "justify-items-stretch",
    "overflow-hidden",
    "rounded-3xl",
    "border-white",
    "cursor-pointer",
    "w-full",
    "h-full",
    "absolute",
    "left-0",
    "top-0"
  );

  const faceStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    background: "#11181c linear-gradient(152.13deg, rgba(217, 217, 217, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
    gridArea: "1/1",
    border: "2px",
  };

  return (
    <div
      className="DevCard"
      style={{
        width: "245px",
        height: "348px",
      }}
    >
      <Tilt
        tiltEnable={isInteractive}
        glareEnable={isInteractive}
        trackOnWindow={isInteractive}
        glareBorderRadius="1.5rem"
        flipHorizontally={isFlipped}
        className={clsx("DevCard-card", "relative", "rounded-3xl", "w-full", "h-full", "border", "border-gray-400")}
        style={{
          boxShadow: "0px 0px 20px -12px rgba(0, 0, 0, 0.25)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={clsx("DevCard-front", faceClasses)}
          onClick={handleCardClick}
          style={{
            ...faceStyle,
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
                  <div className="text-6xl font-black">{props.isLoading ? "-" : props.repos}</div>
                  <div className="text-xs">{props.repos! === 1 ? "Repo" : "Repos"}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "DevCard-avatar",
              "absolute",
              "top-1/2",
              "left-1/2",
              "bg-white",
              "border-white",
              "border-2",
              "block",
              "rounded-full",
              "w-28",
              "h-28",
              "text-transparent",
              "overflow-hidden"
            )}
            style={{ transform: "translate(-50%, -75%)" }}
          >
            <Image src={props.avatarURL} alt="avatar" width={116} height={116} />
          </div>
        </div>
        <div
          className={clsx("DevCard-back", faceClasses)}
          onClick={handleCardClick}
          style={{
            ...faceStyle,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="p-2 pt-4 w-full h-full flex flex-col">
            <div
              className="text-white rounded-full w-full bg-[#F98026] mb-2 flex items-center"
              style={{
                boxShadow: "0px 10px 15px -3px rgba(249, 128, 38, 0.1), 0px 4px 6px -2px rgba(249, 128, 38, 0.05)",
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
                      <div className="flex text-xs">{getRelativeDays(props.age)}</div>
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
              {!props.hideProfileButton && (
                <Link href={profileHref} passHref>
                  <Button variant="primary" className="w-full text-center justify-center mt-4 !py-1">
                    View Profile
                  </Button>
                </Link>
              )}
              <div className="flex justify-center mt-2">
                <Image className="rounded" alt="Open Sauced Logo" width={13} height={13} src={openSaucedImg} />
                <p className={"font-semibold text-white ml-1"} style={{ fontSize: "8px" }}>
                  OpenSauced
                </p>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

type Activity = "high" | "mid";

function getActivity(prs: number): Activity {
  if (prs > 4) {
    return "high";
  } else {
    return "mid";
  }
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
