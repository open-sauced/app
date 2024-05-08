import { HiOutlineTicket } from "react-icons/hi";
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
  const topFourPercentage = !lotteryFactor
    ? 0
    : Number(
        (
          lotteryFactor.all_contribs.slice(0, 4).reduce((prev, contributor) => prev + contributor.percent_of_total, 0) *
          100
        ).toPrecision(1)
      );

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

      <section></section>

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
                <td className="font-medium border-b-1 items-start pb-4">
                  <DevProfile username={contributor.contributor} hasBorder={false} />
                </td>
                <td className="font-semibold text-center border-b-1">{contributor.count}</td>
                <td className="font-semibold text-end border-b-1">
                  {humanizeNumber((contributor.percent_of_total * 100).toPrecision(1))}%
                </td>
              </tr>
            ))}
            <tr>
              <td className="flex gap-2 items-center">
                <StackedOwners
                  owners={lotteryFactor.all_contribs.slice(4, 7).map((contributor) => contributor.contributor)}
                />
                <p className="font-medium">Other contributors</p>
              </td>
              <td></td>
              <td className="text-end font-semibold">{100 - topFourPercentage}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </Card>
  );
}
