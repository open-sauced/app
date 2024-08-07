import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowTrendingUpIcon, MinusSmallIcon, ArrowSmallUpIcon, ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { FiGlobe } from "react-icons/fi";
import Button from "components/shared/Button/button";
import Pill, { PillProps } from "components/atoms/Pill/pill";
import openSaucedImg from "img/openSauced-icon.png";
import { getRelativeDays } from "lib/utils/date-utils";
import DevCardGradient from "../../../public/devcard-gradient.png";
import { getAvatarByUsername } from "lib/utils/github";

export default function DevCard(props: { user: DbUser, isFlipped: boolean, isInteractive: boolean, onFlip?: () => void }) {
  const [isFlipped, setIsFlipped] = useState(props.isFlipped ?? false);
  const isInteractive = props.isInteractive ?? true;

  // TODO: fetch activity (TBD)
  const activity = getActivity(0);

  useEffect(() => {
    setIsFlipped(props.isFlipped ?? false);
  }, [props.isFlipped]);

  useEffect(() => {
    if (!props.isInteractive) {
      setIsFlipped(props.isFlipped ?? false);
    }
  }, [props.isInteractive, props.isFlipped]);

  const profileHref = `/u/${props.user.login}`;

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
        glareBorderRadius="0.75rem"
        flipHorizontally={isFlipped}
        className="DevCard-card relative rounded-xl w-full h-full border border-gray-400"
        style={{
          boxShadow: "0px 0px 20px -12px rgba(0, 0, 0, 0.25)",
          transformStyle: "preserve-3d",
        }}
      >
        {/** Front View **/}
        <div
          className="relative DevCard-front flex flex-col overflow-hidden rounded-xl border-white cursor-pointer w-full h-full"
          onClick={handleCardClick}
          style={{
            ...faceStyle,
          }}
        >
          <Image
            src={DevCardGradient}
            alt="devcard-gradient"
            className="absolute top-0 inset-x-0"
            width={245}
            height={348}
          />
          <Image
            src="/devcard-border.svg"
            alt="devcard-border"
            className="absolute top-0 inset-x-0 p-2"
            width={245}
            height={348}
          />
          <div className="z-10 flex flex-col gap-2 items-center justify-center w-full h-full text-white">
            {/** Avatar + @Username **/}
            <div className="flex flex-col items-center gap-1">
              <Image
                src={getAvatarByUsername(props.user.login)}
                alt={`${props.user.login} front avatar`}
                width={100}
                height={100}
                className="rounded-full border-[1.5px] border-gray-300 border-opacity-40"
              />
              <p>@{props.user.login}</p>
            </div>

            {/** OSCR Score **/}
            <div className="flex flex-col items-center gap-1">
              <p className="text-7xl font-bold">{!props.user.oscr ? "-" : Math.ceil(props.user.oscr)}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sauced-orange via-gradient-orange-one to-amber-500 font-medium">
                OSCR Score
              </p>
            </div>

            {/** 'Ranking' Badge **/}
            <div className="flex items-center gap-2 px-2 py-1 border border-amber-500 rounded-full">
              <FiGlobe className="text-lg text-orange-500" />
              <p className="text-xs font-medium">In the top 3%</p>
            </div>
          </div>
        </div>

        <div
          className="DevCard-back flex flex-col overflow-hidden rounded-xl border-white cursor-pointer w-full h-full absolute left-0 top-0 p-2"
          onClick={handleCardClick}
          style={{
            ...faceStyle,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="z-10 flex flex-col gap-4 px-1 py-4 items-center w-full h-full text-white text-xs">
            {/** Avatar + username + OSCR **/}
            <div className="relative flex gap-4 items-center justify-between bg-sauced-orange px-2 py-1 rounded-full w-full font-semibold">
              <Image
                src={getAvatarByUsername(props.user.login)}
                alt={`${props.user.login} front avatar`}
                width={50}
                height={50}
                className="absolute rounded-full border-[1.5px] border-gray-300 border-opacity-40 -left-1"
              />
              <p className="pl-10">{props.user.login}</p>
              <p className="-pl-4 justfy-self-end text-sm">
                {props.user.oscr}
                <span className="text-[0.5rem] text-gray-100 font-normal">/300</span>
              </p>
            </div>

            {/** Bio **/}
            <p className="py-2">{props.user.bio}</p>

            {/** Last 30 Days **/}
            <div className="flex flex-col w-full h-fit text-md">
              <p className="text-gray-300">Last 30 days</p>
              <Separator />
              <div className="flex justify-between items-center">
                <p>Activity</p>
                <ActivityPill activity={activity} size="xsmall" />
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>Opened PRs</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>PR Velocity</p>
                <p>{getRelativeDays(3)}</p> {/** TODO: fetch PR velocity **/}
              </div>
              <Separator />

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

function Separator() {
  return (
    <div
      className="my-2 h-[1px]"
      style={{ background: "linear-gradient(90deg, hsla(206, 12%, 89%, 0.6), hsla(206, 12%, 89%, 0.01)" }}
    ></div>
  );
}
