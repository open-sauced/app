import { HiOutlineTicket } from "react-icons/hi";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";
import { DayRange } from "components/shared/DayRangePicker";
import humanizeNumber from "lib/utils/humanizeNumber";
import StackedOwners from "components/Workspaces/StackedOwners";
import DevProfile from "components/molecules/DevProfile/dev-profile";
import InfoTooltip from "components/shared/InfoTooltip";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type LotteryFactorChartProps = {
  lotteryFactor: RepositoryLottoFactor | undefined;
  isLoading: boolean;
  error: Error | undefined;
  range: DayRange;
};

export default function LotteryFactorChart({ lotteryFactor, isLoading, error, range }: LotteryFactorChartProps) {
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const topFourPercentage = useMemo(
    () =>
      isLoading || !lotteryFactor
        ? 0
        : Number(
            (
              lotteryFactor.all_contribs
                .slice(0, 4)
                .reduce((prev, contributor) => prev + contributor.percent_of_total, 0) * 100
            ).toPrecision(1)
          ),
    [isLoading, lotteryFactor]
  );

  const sortedContributors = useMemo(() => {
    const result =
      !isLoading && lotteryFactor
        ? lotteryFactor.all_contribs.slice(0, 4).map((contributor) => {
            return {
              name: contributor.contributor,
              value: Number((contributor.percent_of_total * 100).toPrecision(1)),
              factor: contributor.lotto_factor,
            };
          })
        : ([] as {
            name: string;
            value: number;
            factor: "very-high" | "high" | "moderate" | "low" | "Other Contributors";
          }[]);
    result.push({ name: "Other Contributors", value: 100 - topFourPercentage, factor: "Other Contributors" });
    return result;
  }, [lotteryFactor]);

  const summary = useMemo(() => {
    if (isLoading || !lotteryFactor) {
      return <p className="text-slate-500">Loading...</p>;
    }

    const topFourContributors = lotteryFactor?.all_contribs.slice(0, 4);
    let count = 0;
    let percentage = 0;
    while (percentage < 50) {
      percentage += Number(((topFourContributors[count]?.percent_of_total ?? 0) * 100).toPrecision(1));
      count++;
      if (count === 4) {
        break;
      }
    }

    return (
      <p className="text-slate-500">
        The top <span className="font-semibold text-black">{count}</span> contributor{count > 1 && "s"} of this
        repository have made <span className="font-semibold text-black">{percentage}%</span> of all commits in the past{" "}
        <span className="font-semibold text-black">{range}</span> days.
      </p>
    );
  }, [isLoading, lotteryFactor, range]);

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
          {isLoading || !lotteryFactor ? (
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

      <section className="w-full px-4 lg:px-8 flex flex-col gap-4 text-sm lg:text-base">
        {isLoading ? <Skeleton height={32} /> : summary}
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

      <table className="table-auto divide-y text-xs lg:text-base text-slate-500 w-full px-4 lg:px-8 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="font-normal text-start">Contributor</th>
            <th className="font-normal text-center">Commits</th>
            <th className="font-normal text-end">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || !lotteryFactor ? (
            <SkeletonWrapper count={4} height={32} />
          ) : (
            lotteryFactor.all_contribs.slice(0, 4).map((contributor) => (
              <tr
                key={contributor.contributor}
                className={`${hovered === contributor.contributor && "bg-slate-100"} items-start`}
              >
                <td
                  className={`${
                    hovered === contributor.contributor ? "font-semibold" : "font-normal"
                  } border-b-1 py-4 pl-2`}
                >
                  <DevProfile username={contributor.contributor} hasBorder={false} />
                </td>
                <td
                  className={`${
                    hovered === contributor.contributor ? "font-semibold" : "font-normal"
                  } text-center border-b-1 py-4`}
                >
                  {contributor.count}
                </td>
                <td
                  className={`${
                    hovered === contributor.contributor ? "font-semibold" : "font-normal"
                  } text-end border-b-1 py-4 pr-2`}
                >
                  {humanizeNumber((contributor.percent_of_total * 100).toPrecision(1))}%
                </td>
              </tr>
            ))
          )}
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
              <td className="text-end py-4 pr-2">{100 - topFourPercentage}%</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
