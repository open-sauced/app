import { HiOutlineTicket } from "react-icons/hi";
import { useMemo, useState } from "react";
import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";
import { DayRange } from "components/shared/DayRangePicker";
import humanizeNumber from "lib/utils/humanizeNumber";
import StackedOwners from "components/Workspaces/StackedOwners";
import DevProfile from "components/molecules/DevProfile/dev-profile";

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
      !lotteryFactor
        ? 0
        : Number(
            (
              lotteryFactor.all_contribs
                .slice(0, 4)
                .reduce((prev, contributor) => prev + contributor.percent_of_total, 0) * 100
            ).toPrecision(1)
          ),
    [lotteryFactor]
  );

  const sortedContributors = useMemo(() => {
    const result = lotteryFactor
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
          </div>
          {!lotteryFactor ? (
            <Pill text="..." color="slate" />
          ) : (
            <Pill
              text={lotteryFactor.all_lotto_factor ?? ""}
              color={
                lotteryFactor.all_lotto_factor === "high"
                  ? "red"
                  : lotteryFactor.all_lotto_factor === "moderate"
                  ? "yellow"
                  : lotteryFactor.all_lotto_factor === "low"
                  ? "green"
                  : "purple"
              }
              className="capitalize"
            />
          )}
        </header>
      </section>

      <section className="w-full">
        <div className="flex gap-1 h-3 place-content-center px-8">
          {sortedContributors.map((item, index) => {
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
          })}
        </div>
      </section>

      {!lotteryFactor ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto divide-y text-slate-500 gap-4 w-full px-4 lg:px-8 border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className="font-normal text-start">Contributor</th>
              <th className="font-normal text-center">Commits</th>
              <th className="font-normal text-end">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {lotteryFactor.all_contribs.slice(0, 4).map((contributor) => (
              <tr key={contributor.contributor} className="items-start">
                <td
                  className={`${hovered === contributor.contributor ? "font-semibold" : "font-normal"} border-b-1 pb-5`}
                >
                  <DevProfile username={contributor.contributor} hasBorder={false} />
                </td>
                <td
                  className={`${
                    hovered === contributor.contributor ? "font-semibold" : "font-normal"
                  } text-center border-b-1`}
                >
                  {contributor.count}
                </td>
                <td
                  className={`${
                    hovered === contributor.contributor ? "font-semibold" : "font-normal"
                  } text-end border-b-1`}
                >
                  {humanizeNumber((contributor.percent_of_total * 100).toPrecision(1))}%
                </td>
              </tr>
            ))}
            <tr className={`${hovered === "Other Contributors" ? "font-semibold" : "font-normal"}`}>
              <td className="flex gap-2 items-center">
                <StackedOwners
                  owners={lotteryFactor.all_contribs.slice(4, 7).map((contributor) => contributor.contributor)}
                />
                <p>Other contributors</p>
              </td>
              <td></td>
              <td className="text-end">{100 - topFourPercentage}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </Card>
  );
}
