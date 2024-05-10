import { Meta, StoryObj } from "@storybook/react";
import LotteryFactorChart from "./LotteryFactorChart";

type Story = StoryObj<typeof LotteryFactorChart>;

const meta: Meta<typeof LotteryFactorChart> = {
  title: "Components/Repositories/LotteryFactorChart",
  component: LotteryFactorChart,
  args: {
    lotteryFactor: generateLotteryFactor(),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

export default meta;

export const Default: Story = {
  args: {
    lotteryFactor: generateLotteryFactor(),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

export const LoadingState: Story = {
  args: {
    lotteryFactor: generateLotteryFactor(),
    range: 30,
    isLoading: true,
    error: undefined,
  },
};

export const AllLottoFactorVeryHigh: Story = {
  args: {
    lotteryFactor: generateLotteryFactor("very-high"),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

export const AllLottoFactorHigh: Story = {
  args: {
    lotteryFactor: generateLotteryFactor("high"),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

export const AllLottoFactorModerate: Story = {
  args: {
    lotteryFactor: generateLotteryFactor("moderate"),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

export const AllLottoFactorLow: Story = {
  args: {
    lotteryFactor: generateLotteryFactor("low"),
    range: 30,
    isLoading: false,
    error: undefined,
  },
};

function generateLotteryFactor(all_lotto_factor = "high") {
  return {
    all_contribs: [
      {
        contributor: "nickytonline",
        count: 40,
        percent_of_total: 0.36036036036036034,
        lotto_factor: "high",
      },
      {
        contributor: "brandonroberts",
        count: 27,
        percent_of_total: 0.24324324324324326,
        lotto_factor: "moderate",
      },
      {
        contributor: "zeucapua",
        count: 21,
        percent_of_total: 0.1891891891891892,
        lotto_factor: "moderate",
      },
      {
        contributor: "Lalithkumarponnambalam",
        count: 4,
        percent_of_total: 0.036036036036036036,
        lotto_factor: "low",
      },
      {
        contributor: "JayPokale",
        count: 4,
        percent_of_total: 0.036036036036036036,
        lotto_factor: "low",
      },
      {
        contributor: "Idrinth",
        count: 3,
        percent_of_total: 0.02702702702702703,
        lotto_factor: "low",
      },
      {
        contributor: "devharsh2k4",
        count: 3,
        percent_of_total: 0.02702702702702703,
        lotto_factor: "low",
      },
      {
        contributor: "bdougie",
        count: 2,
        percent_of_total: 0.018018018018018018,
        lotto_factor: "low",
      },
      {
        contributor: "francisko-rezende",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "Asin-Junior-Honore",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "BekahHW",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "jpmcb",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "beckyrich",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "dependabot[bot]",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
      {
        contributor: "nikkhielseath",
        count: 1,
        percent_of_total: 0.009009009009009009,
        lotto_factor: "low",
      },
    ] as ContributorLottoFactor[],
    all_lotto_factor: all_lotto_factor as LottoFactor,
  };
}
