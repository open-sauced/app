import { HiOutlineTicket } from "react-icons/hi";
import Card from "components/atoms/Card/card";
import Pill from "components/atoms/Pill/pill";

export default function LotteryFactorChart() {
  return (
    <Card className="flex flex-col gap-8 w-full h-full items-center p-4">
      <section className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between px-4 lg:px-8">
        <header className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <HiOutlineTicket className="text-xl" />
            <h3 className="text-sm font-semibold md:text-lg text-slate-800">Lottery Factor</h3>
          </div>
          <Pill text="High" color="red" size="base" />
        </header>
      </section>
    </Card>
  );
}
