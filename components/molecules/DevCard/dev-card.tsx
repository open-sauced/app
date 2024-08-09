import Image from "next/image";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { FiGlobe } from "react-icons/fi";
import { PiCrownSimpleFill } from "react-icons/pi";
import { HiArrowNarrowRight, HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import Button from "components/shared/Button/button";
import openSaucedImg from "img/openSauced-icon.png";
import { getRelativeDays } from "lib/utils/date-utils";
import { getAvatarByUsername } from "lib/utils/github";
import { UserDevStats } from "pages/u/[username]/card";
import Pill from "components/atoms/Pill/pill";
import DevCardGradient from "../../../public/devcard-gradient.png";

export type DevCardProps = {
 user: UserDevStats | undefined;
 isFlipped?: boolean;
 isInteractive?: boolean;
 hideProfileButton?: boolean;
 isLoading?: boolean;
 onFlip?: () => void;
}

export default function DevCard(props: DevCardProps) {
  const [isFlipped, setIsFlipped] = useState(props.isFlipped ?? false);
  const isInteractive = props.isInteractive ?? true;

  useEffect(() => {
    setIsFlipped(props.isFlipped ?? false);
  }, [props.isFlipped]);

  useEffect(() => {
    if (!props.isInteractive) {
      setIsFlipped(props.isFlipped ?? false);
    }
  }, [props.isInteractive, props.isFlipped]);

  function handleCardClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!isInteractive) {
      return;
    }

    // flip the card if the click is not on the button
    if (!(event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement)) {
      setIsFlipped(!isFlipped);
      props.onFlip?.();
    }
  }

  const faceStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    background: "#11181c linear-gradient(152.13deg, rgba(217, 217, 217, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
    gridArea: "1/1",
    border: "2px",
  };

  const getValueBasedOnCount = ({ low, med, high }: { low: any; med: any; high: any }) => {
    const recent_pull_requests_count = props.user?.recent_pull_requests_count || 0;

    return recent_pull_requests_count < 7 ? low
      : recent_pull_requests_count< 28 ? med
      : high;
  };

  return (
    <div
      className="DevCard"
      style={{
        width: "245px",
        height: "348px",
      }}
      onClick={handleCardClick}
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
                src={getAvatarByUsername(props.user?.login || "asf")}
                alt={`${props.user?.login} front avatar`}
                width={100}
                height={100}
                className="rounded-full border-[1.5px] border-gray-300 border-opacity-40"
              />
              <p>@{props.user?.login}</p>
            </div>

            {/** OSCR Score **/}
            <div className="flex flex-col items-center gap-1">
              <p className="text-7xl font-bold">{!props.user?.oscr ? "-" : Math.ceil(props.user?.oscr)}</p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sauced-orange via-gradient-orange-one to-amber-500 font-medium">
                OSCR Score
              </p>
            </div>

            {/** 'Ranking' Badge **/}
            { props.user?.oscr && props.user?.oscr > 200 &&
              <RankingBadge oscr={props.user.oscr} />
            }
          </div>
        </div>

        {/** Back View **/}
        <div
          className="DevCard-back flex flex-col overflow-hidden rounded-xl border-white cursor-pointer w-full h-full absolute left-0 top-0 p-4"
          style={{
            ...faceStyle,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="z-10 flex flex-col gap-3 items-center w-full h-full text-white text-xs">
            {/** Avatar + username + OSCR **/}
            <div className="relative flex gap-4 items-center justify-between bg-sauced-orange px-2 py-1 rounded-full w-full font-semibold">
              <Image
                src={getAvatarByUsername(props.user?.login || "zeucapua")}
                alt={`${props.user?.login} front avatar`}
                width={50}
                height={50}
                className="absolute rounded-full border-[1.5px] border-gray-300 border-opacity-40 -left-1"
              />
              <p className="pl-10">{props.user?.login}</p>
              <p className="-pl-4 justfy-self-end text-sm flex gap-0.5">
                {Math.ceil(props.user?.oscr || 0)}
                <span className="text-[0.5rem] text-gray-100 font-normal">/300</span>
              </p>
            </div>

            {/** Bio **/}
            <p className="py-2">{props.user?.bio}</p>

            {/** Last 30 Days **/}
            <div className="flex flex-col w-full h-fit text-md">
              <p className="text-gray-300">Last 30 days</p>
              <Separator />
              <div className="flex justify-between items-center">
                <p>Activity</p>
                <ActivityBadge getValueBasedOnCount={getValueBasedOnCount} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>Opened PRs</p>
                <p>{props.user?.recent_pull_requests_count}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>PR Velocity</p>
                <p>{getRelativeDays(props.user?.recent_pull_request_velocity_count || 0)}</p>
              </div>
              <Separator />
            </div>

            {/** Footer **/}
            <div className="flex flex-col gap-[0.25] w-full self-end">
              {!props.hideProfileButton &&
                <Button variant="primary" href={`/u/${props.user?.login}`} className="w-full justify-center">
                  View Profile
                </Button>
              }
              <div className="flex justify-center my-2">
                <Image className="rounded" alt="OpenSauced Logo" width={13} height={13} src={openSaucedImg} />
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

function Separator() {
  return (
    <div
      className="my-2 h-[1px]"
      style={{ background: "linear-gradient(90deg, hsla(206, 12%, 89%, 0.6), hsla(206, 12%, 89%, 0.01)" }}
    ></div>
  );
}

function ActivityBadge({ getValueBasedOnCount }: {
  getValueBasedOnCount: ({ low, med, high }: { low: any, med: any, high: any }) => any
}) {

  const status = getValueBasedOnCount({
    low: "Low",
    med: "Mid",
    high: "High",
  });

  const icon = getValueBasedOnCount({
    low: <HiTrendingDown />,
    med: <HiArrowNarrowRight />,
    high: <HiTrendingUp />,
  });

  const color = getValueBasedOnCount({
    low: "red",
    med: "yellow",
    high: "green"
  });

  return (
    <Pill text={status} icon={icon} color={color} size="xsmall" />
  );
}

function RankingBadge({ oscr }: { oscr: number }) {
  const getValueBasedOnOscr = ({ five, four, three, two, one }:
    { five: any, four: any, three: any, two: any, one: any }
  ) => {
    return oscr > 250 ? one
      : oscr > 235 ? two
      : oscr > 225 ? three
      : oscr > 215 ? four
      : oscr > 200 ? five
      : null;
  };

  const percentage = getValueBasedOnOscr({ five: 5, four: 4, three: 3, two: 2, one: 1 });
  const icon = getValueBasedOnOscr({
    five: <FiGlobe className="text-lg text-orange-500" />,
    four: <FiGlobe className="text-lg text-orange-500" />,
    three: <PiCrownSimpleFill className="text-lg text-orange-500" />,
    two: <PiCrownSimpleFill className="text-lg text-orange-500" />,
    one: <PiCrownSimpleFill className="text-lg text-orange-500" />,
  });

  return (
    <div className="flex items-center gap-2 px-2 py-1 border border-amber-500 rounded-full">
      {icon}
      <p className="text-xs font-medium">In the top {percentage}%</p>
    </div>
  );
}
