import React from "react";
import Text from "components/atoms/Typography/text";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";
import Link from "next/link";

const OnboardingButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 border border-orange-800 py-1 px-1 pr-3 rounded-lg">
      <ProgressPie percentage={66} />
      <Text className="text-sm !text-slate-100 font-semibold">
        <Link href="/start">Complete the onboarding</Link>
      </Text>
    </button>
  );
};

export default OnboardingButton;
