import { HiOutlineTicket } from "react-icons/hi";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { FaArrowRight, FaRegHandPeace } from "react-icons/fa6";
import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";
import { DayRange } from "components/shared/DayRangePicker";
import StackedOwners from "components/Workspaces/StackedOwners";
import InfoTooltip from "components/shared/InfoTooltip";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Avatar from "components/atoms/Avatar/avatar";

import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import errorImage from "../../public/assets/images/lotto-factor-empty.png";

type LotteryFactorChartProps = {
  lotteryFactor: RepositoryLottoFactor | undefined;
  isLoading: boolean;
  error: Error | undefined;
  range: DayRange;
  uniqueYoloCoders?: Set<string>;
  yoloBannerOnClick?: () => void;
  showHoverCards?: boolean;
  className?: string;
};

export default function LotteryFactorChart({
  lotteryFactor,
  isLoading,
  error,
  range,
  uniqueYoloCoders = new Set<string>(),
  yoloBannerOnClick,
  showHoverCards,
  className,
}: LotteryFactorChartProps) {
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const topFourContributors = lotteryFactor?.all_contribs.slice(0, 4) ?? [];
  const hasContributors = topFourContributors.length > 0;

  const { sortedContributors } = useMemo(() => {
    const result =
      topFourContributors.map((contributor) => {
        return {
          name: contributor.contributor,
          count: contributor.count,
          value: Number((contributor.percent_of_total * 100).toPrecision(1)),
          factor: contributor.lotto_factor as LottoFactor | "Other Contributors",
        };
      }) ??
      ([] as {
        name: string;
        count: number;
        value: number;
        factor: LottoFactor | "Other Contributors";
      }[]);

    const topFourPercentage = result.reduce((prev, curr) => (prev += curr.value), 0);

    if (lotteryFactor?.all_contribs.length && lotteryFactor?.all_contribs.length > 4) {
      result.push({
        name: "Other Contributors",
        count: 0,
        value: 100 - topFourPercentage,
        factor: "Other Contributors",
      });
    }

    return {
      sortedContributors: result,
      topFourPercentage,
    };
  }, [topFourContributors]);

  const summary = useMemo(() => {
    let count = 0;
    let percentage = 0;
    while (percentage < 50 && count !== 4) {
      let current = Number(((topFourContributors.at(count)?.percent_of_total ?? 0) * 100).toPrecision(1));
      percentage += current;
      count++;
    }

    return { count, percentage };
  }, [topFourContributors]);

  function getLottoColor(factor: string) {
    switch (factor) {
      case "very-high":
        return "#E80010";
      case "high":
        return "#FC5108";
      case "moderate":
        return "#FEC009";
      case "low":
        return "#5CC90C";
      case "Other Contributors":
        return "#0649F1";
    }
  }

  return (
    <Card className={`${className ?? ""} flex flex-col gap-4 w-full h-full items-center pt-8`}>
      <section className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between px-4">
        <header className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <HiOutlineTicket className="text-xl" />
            <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Lottery Factor</h3>
            <InfoTooltip information="Identifies project risk due to dependency on top contributors. Indicates project vulnerability if 2 or fewer do >50% of the work." />
          </div>
          {error ? null : isLoading || !lotteryFactor ? (
            <SkeletonWrapper width={42} height={24} radius={999} />
          ) : (
            <Pill
              text={lotteryFactor.all_lotto_factor.replace("-", " ") ?? ""}
              color={
                lotteryFactor.all_lotto_factor === "high"
                  ? "red"
                  : lotteryFactor.all_lotto_factor === "moderate"
                  ? "yellow"
                  : lotteryFactor.all_lotto_factor === "low"
                  ? "green"
                  : lotteryFactor.all_lotto_factor === "very-high"
                  ? "purple"
                  : "slate"
              }
              className="capitalize"
            />
          )}
        </header>
      </section>

      {yoloBannerOnClick && (
        <button
          onClick={yoloBannerOnClick}
          className="flex items-center justify-between w-full text-slate-500 shadow-sm !border !border-slate-300 p-1 gap-2 text-sm rounded-full"
        >
          <div className="flex gap-2 items-center">
            <div className="flex items-center font-medium gap-1 px-2 py-0.5 rounded-2xl bg-light-red-4 text-light-red-11">
              <FaRegHandPeace />
              YOLO Coders
            </div>
            Pushing commits directly to main
          </div>

          <div className="flex gap-2 items-center ml-auto mr-3">
            <p>See more</p>
            <FaArrowRight />
          </div>
        </button>
      )}

      <section className="w-full px-4 flex flex-col gap-4 text-xs xl:text-sm">
        {isLoading ? (
          <Skeleton height={32} />
        ) : (
          <p className="text-slate-500">
            {hasContributors ? (
              <>
                The top{" "}
                {summary.count > 1 ? <span className="font-semibold text-black">{`${summary.count} `}</span> : null}
                contributor{summary.count > 1 && "s"} of this repository {summary.count > 1 ? "have" : "has"} made{" "}
                <span className="font-semibold text-black">{summary.percentage}% </span>
                of all commits in the past <span className="font-semibold text-black">{range}</span> days.
              </>
            ) : (
              <>
                {error ? (
                  <>This repository doesn&apos;t have enough commit data to calculate the Lottery Factor.</>
                ) : (
                  <>
                    No one has contributed to the repository in the past{" "}
                    <span className="font-semibold text-black">{range}</span> days.
                  </>
                )}
              </>
            )}
          </p>
        )}
        <div className="flex w-full gap-1 h-3 place-content-center">
          {isLoading ? (
            <SkeletonWrapper />
          ) : (
            sortedContributors.map((item, index) => {
              return (
                <button
                  aria-label={`${item.name} is ${item.value}% of the most used languages for contributors in your list`}
                  key={item.name}
                  data-language={item.name}
                  className={`${index === 0 ? "rounded-l-lg" : ""} ${
                    index === sortedContributors.length - 1 ? "rounded-r-lg" : ""
                  } transform hover:scale-110 transition-transform hover:z-10`}
                  style={{ backgroundColor: getLottoColor(item.factor), width: `${item.value}%` }}
                  onMouseOver={(event) => {
                    const { language } = event.currentTarget.dataset;
                    setHovered(language);
                  }}
                  onMouseOut={(event) => {
                    setHovered(undefined);
                  }}
                  onFocus={(event) => {
                    const { language } = event.currentTarget.dataset;
                    setHovered(language);
                  }}
                  onBlur={(event) => {
                    setHovered(undefined);
                  }}
                />
              );
            })
          )}
        </div>
      </section>

      {!isLoading && (error || !hasContributors) ? <Image src={errorImage} alt="" /> : null}

      {isLoading ? (
        <div className="flex flex-col w-full gap-4 px-4">
          <SkeletonWrapper count={4} height={32} />
        </div>
      ) : null}

      {!isLoading && hasContributors ? (
        <table className="table-fixed divide-y text-xs xl:text-sm text-slate-500 w-full px-4 border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="font-normal text-start">Contributor</th>
              <th className="font-normal text-end w-fit">Commits</th>
              <th className="font-normal text-end">% of Total</th>
            </tr>
          </thead>
          <tbody className="!text-small truncate [&_tr_td]:border-b-1">
            {sortedContributors.slice(0, 4).map(({ name, count, value }) => (
              <tr key={name} className={`${hovered === name && "bg-slate-100"} grow items-start`}>
                <td className={`${hovered === name ? "font-semibold" : "font-normal"} pt-1 pb-2 pl-2`}>
                  {/*
                    Temporarily copying the DevProfile JSX minus the desktop view to fix this issue https://github.com/open-sauced/app/pull/3373#issuecomment-2112399608
                  */}
                  <div className="flex items-center gap-2 text-light-slate-11">
                    {showHoverCards ? (
                      <HoverCard.Root>
                        <Link href={`/u/${name}`} className="rounded-full">
                          <HoverCard.Trigger>
                            <Avatar
                              size={24}
                              className="xl:w-9 xl:h-9"
                              isCircle
                              hasBorder={false}
                              avatarURL={getAvatarByUsername(name)}
                            />
                          </HoverCard.Trigger>
                        </Link>
                        <HoverCard.Portal>
                          <HoverCard.Content sideOffset={5}>
                            <HoverCardWrapper username={name} />
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    ) : (
                      <Link href={`/u/${name}`} className="rounded-full">
                        <Avatar
                          size={24}
                          className="xl:w-9 xl:h-9"
                          isCircle
                          hasBorder={false}
                          avatarURL={getAvatarByUsername(name)}
                        />
                      </Link>
                    )}
                    <div className="flex gap-1 items-center">
                      <h1 className="truncate text-light-slate-12">{name}</h1>
                      {uniqueYoloCoders.has(name) && (
                        <button onClick={yoloBannerOnClick}>
                          <InfoTooltip icon={<FaRegHandPeace />} information="YOLO Coder" />
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td className={`${hovered === name ? "font-semibold" : "font-normal"} text-end w-fit`}>{count}</td>
                <td className={`${hovered === name ? "font-semibold" : "font-normal"} text-end pt-1 pb-2 pr-2 `}>
                  {value}%
                </td>
              </tr>
            ))}
            {isLoading ? <Skeleton /> : null}
            {lotteryFactor?.all_contribs.length && lotteryFactor?.all_contribs.length > 4 ? (
              <tr className={`${hovered === "Other Contributors" ? "font-semibold bg-slate-100" : "font-normal"}`}>
                <td className="flex gap-2 items-center pt-1 pb-2 xl:py-4 pl-2">
                  <StackedOwners
                    owners={lotteryFactor.all_contribs.slice(4, 7).map((contributor) => contributor.contributor)}
                  />
                  <p>Other contributors</p>
                </td>
                <td></td>
                <td className="text-end pt-1 pb-2 pr-2 xl:py-4">
                  {sortedContributors.at(sortedContributors.length - 1)?.value}%
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      ) : null}
    </Card>
  );
}
