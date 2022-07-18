import React from "react";
import Text from "components/atoms/Typography/text";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";

const OnboardingButton: React.FC = () => {
  return (
      <ProgressPie percentage={30} />
    <button className="flex items-center gap-2 border border-orange-800 py-1 px-1 pr-3 rounded-lg">
      <Text className="text-sm !text-slate-100 font-semibold">
        Complete the onboarding
      </Text>
    </button>
  );
};

export default OnboardingButton;