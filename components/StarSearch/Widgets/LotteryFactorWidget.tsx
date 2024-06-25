import LotteryFactorChart from "components/Repositories/LotteryFactorChart";
import { useRepositoryLottoFactor } from "lib/hooks/api/useRepositoryLottoFactor";

interface LotteryFactorWidgetProps {
  repoName: string;
}

const LotteryFactorWidget = ({ repoName }: LotteryFactorWidgetProps) => {
  const range = 30;
  const { data, error, isLoading } = useRepositoryLottoFactor({ repository: repoName.toLowerCase(), range });

  if (error) {
    // whether it's a 404 or any other error, we don't want to render the widget
    // StarSearch will handle the error.
    throw error;
  }

  return (
    <div className="grid gap-2">
      <a className="font-semibold" href={`/s/${repoName}`} style={{ color: "inherit" }} target="_blank">
        {repoName}
      </a>
      <LotteryFactorChart lotteryFactor={data} isLoading={isLoading} error={error} range={range} />
    </div>
  );
};

export default LotteryFactorWidget;
