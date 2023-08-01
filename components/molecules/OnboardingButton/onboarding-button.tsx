import React from "react";
import Link from "next/link";
import Text from "components/atoms/Typography/text";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";

const OnboardingButton: React.FC = () => {
  return (
    <button className="items-center gap-2 border border-light-orange-8 py-1 px-1 pr-3 rounded-lg hidden md:flex">
      <ProgressPie percentage={66} />
      <Text className="text-sm !text-light-slate-12  ">
        <Link href="/start">Complete the onboarding</Link>
      </Text>
    </button>
  );
};

export default OnboardingButton;
