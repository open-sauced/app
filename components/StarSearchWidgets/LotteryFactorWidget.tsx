import LotteryFactorChart from "components/Repositories/LotteryFactorChart";
import { useRepositoryLottoFactor } from "lib/hooks/api/useRepositoryLottoFactor";

interface LotteryFactorWidgetProps {
  repoName: string;
}

const LotteryFactorWidget = ({ repoName }: LotteryFactorWidgetProps) => {
  const range = 30;
  const {
    data: lotteryFactor,
    error: lotteryFactorError,
    isLoading: isLotteryFactorLoading,
  } = useRepositoryLottoFactor({ repository: repoName.toLowerCase(), range });

  return (
    <LotteryFactorChart
      lotteryFactor={lotteryFactor}
      isLoading={isLotteryFactorLoading}
      error={lotteryFactorError}
      range={range}
    />
  );
};

export default LotteryFactorWidget;
