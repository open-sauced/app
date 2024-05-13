import { HiOutlineTicket } from "react-icons/hi";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";
import { DayRange } from "components/shared/DayRangePicker";
import StackedOwners from "components/Workspaces/StackedOwners";
import DevProfile from "components/molecules/DevProfile/dev-profile";
import InfoTooltip from "components/shared/InfoTooltip";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

import errorImage from "../../public/assets/images/lotto-factor-empty.png";

type LotteryFactorChartProps = {
  lotteryFactor: RepositoryLottoFactor | undefined;
  isLoading: boolean;
  error: Error | undefined;
  range: DayRange;
};

export default function LotteryFactorChart({ lotteryFactor, isLoading, error, range }: LotteryFactorChartProps) {
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const topFourContributors = lotteryFactor?.all_contribs.slice(0, 4) ?? [];

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

    result.push({
      name: "Other Contributors",
      count: 0,
      value: 100 - topFourPercentage,
      factor: "Other Contributors",
    });
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
    <Card className="flex flex-col gap-4 w-full h-full items-center pt-8 p-4">
      <section className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between px-4 lg:px-8">
        <header className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <HiOutlineTicket className="text-xl" />
            <h3 className="text-sm font-semibold md:text-lg text-slate-800">Lottery Factor</h3>
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

      {error ? null : (
        <section className="w-full px-4 lg:px-8 flex flex-col gap-4 text-sm lg:text-base">
          {isLoading ? (
            <Skeleton height={32} />
          ) : (
            <p className="text-slate-500">
              The top <span className="font-semibold text-black">{`${summary.count} `}</span>
              contributor{summary.count > 1 && "s"} of this repository have made{" "}
              <span className="font-semibold text-black">{summary.percentage}% </span>
              of all commits in the past <span className="font-semibold text-black">{range}</span> days.
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
      )}

      {error && (
        <div className="flex flex-col gap-4 p-4">
          <p className="text-slate-500">
            This repository doesn&apos;t have enough commit data to calculate the Lottery Factor.
          </p>
          <Image src={errorImage} alt="No Lottery Factor error image" />
        </div>
      )}
      {isLoading || !lotteryFactor ? (
        <div className="flex flex-col w-full gap-4 px-4 lg:px-8">
          <SkeletonWrapper count={4} height={32} />
        </div>
      ) : (
        <table className="table-fixed divide-y text-xs lg:text-base text-slate-500 w-full px-4 lg:px-8 border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="font-normal text-start">Contributor</th>
              <th className="font-normal text-end w-fit">Commits</th>
              <th className="font-normal text-end">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedContributors.slice(0, 4).map(({ name, count, value }) => (
              <tr key={name} className={`${hovered === name && "bg-slate-100"} items-start`}>
                <td className={`${hovered === name ? "font-semibold" : "font-normal"} border-b-1 py-4 pl-2`}>
                  <DevProfile username={name} hasBorder={false} />
                </td>
                <td
                  className={`${
                    hovered === name ? "font-semibold" : "font-normal"
                  } text-end border-b-1 tabular-nums w-fit`}
                >
                  {count}
                </td>
                <td
                  className={`${
                    hovered === name ? "font-semibold" : "font-normal"
                  } text-end border-b-1 py-4 pr-2 tabular-nums`}
                >
                  {value}%
                </td>
              </tr>
            ))}
            {isLoading || !lotteryFactor ? (
              <Skeleton />
            ) : (
              <tr className={`${hovered === "Other Contributors" ? "font-semibold bg-slate-100" : "font-normal"}`}>
                <td className="flex gap-2 items-center py-4 pl-2">
                  <StackedOwners
                    owners={lotteryFactor.all_contribs.slice(4, 7).map((contributor) => contributor.contributor)}
                  />
                  <p>Other contributors</p>
                </td>
                <td></td>
                <td className="text-end py-4 pr-2 tabular-nums">
                  {sortedContributors.at(sortedContributors.length - 1)?.value}%
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}
