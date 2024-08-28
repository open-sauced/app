import Pill from "components/atoms/Pill/pill";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

type LotteryFactorBadgeProps = {
  lotteryFactor: RepositoryLottoFactor | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function LotteryFactorBadge({ lotteryFactor, isLoading, error }: LotteryFactorBadgeProps) {
  return error ? null : isLoading || !lotteryFactor ? (
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
  );
}
