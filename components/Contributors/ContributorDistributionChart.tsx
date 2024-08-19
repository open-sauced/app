import { useState } from "react";
import { FaPeopleCarry } from "react-icons/fa";
import { ResponsiveContainer } from "recharts";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ToggleOption from "components/atoms/ToggleOption/toggle-option";
import Button from "components/shared/Button/button";

type ContributorDistributionChartProps = {
  isLoading: boolean;
  range: number;
  onCategoryClick?: (category: string) => void;
  className?: string;
};

export default function ContributorDistributionChart({
  isLoading,
  range,
  onCategoryClick,
  className,
}: ContributorDistributionChartProps) {
  const [category, setCategory] = useState<"all" | "open" | "closed">("all");
  const [isShowBotsToggled, setShowBotsToggled] = useState(false);
  const [isEnhancedToggled, setEnhancedToggled] = useState(true);

  const renderChart = () => {
    return <></>;
  };

  return (
    <Card className={`${className ?? ""} flex flex-col gap-8 w-full h-full items-center !px-6 !py-8`}>
      <section className="flex flex-col xl:flex-row w-full items-start xl:items-center gap-4 xl:justify-between px-2">
        {isLoading ? (
          <SkeletonWrapper width={100} height={24} />
        ) : (
          <>
            <div className="flex flex-col gap-4 grow">
              <div className="flex gap-2 items-center w-fit">
                <FaPeopleCarry className="text-xl" />
                <div className="flex gap-1 items-center">
                  <h3 className="text-sm font-semibold xl:text-lg text-slate-800">Contributor Distribution</h3>
                  <p className="text-sm xl:text-base w-fit pl-2 text-slate-500 font-medium">{range} days</p>
                </div>
              </div>
              <aside className="flex gap-8">
                <div>
                  <h3 className="text-xs xl:text-sm text-slate-500">Total</h3>
                  <p className="font-semibold text-lg lg:text-xl">0</p>
                </div>
                <div>
                  <h3 className="text-xs xl:text-sm text-slate-500">Over {range} days</h3>
                  <p className="font-semibold text-lg lg:text-xl">0</p>
                </div>
                <div>
                  <h3 className="text-xs xl:text-sm text-slate-500">Avg. per day</h3>
                  <p className="font-semibold text-lg lg:text-xl">0</p>
                </div>
              </aside>
            </div>

            <div className="flex flex-col gap-4 grow items-end">
              <div className="flex gap-2 items-center w-fit">
                <Button
                  variant={category === "all" ? "outline" : "default"}
                  onClick={() => {
                    setCategory("all");
                    onCategoryClick && onCategoryClick("all");
                  }}
                >
                  All
                </Button>
                <Button
                  variant={category === "open" ? "outline" : "default"}
                  onClick={() => {
                    setCategory("open");
                    onCategoryClick && onCategoryClick("open");
                  }}
                >
                  Open
                </Button>
                <Button
                  variant={category === "closed" ? "outline" : "default"}
                  onClick={() => {
                    setCategory("closed");
                    onCategoryClick && onCategoryClick("closed");
                  }}
                >
                  Closed
                </Button>
              </div>
              <aside className="flex gap-2">
                <ToggleOption
                  optionText="Show Bots"
                  checked={isShowBotsToggled}
                  handleToggle={() => setShowBotsToggled(!isShowBotsToggled)}
                />
                <ToggleOption
                  optionText="Enhance"
                  checked={isEnhancedToggled}
                  handleToggle={() => setEnhancedToggled(!isEnhancedToggled)}
                />
              </aside>
            </div>
          </>
        )}
      </section>
      <ResponsiveContainer width="100%" height={300}>
        {isLoading ? <SkeletonWrapper width={100} height={100} /> : renderChart()}
      </ResponsiveContainer>
    </Card>
  );
}
