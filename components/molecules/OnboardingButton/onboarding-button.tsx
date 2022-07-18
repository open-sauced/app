import React from "react";
import Text from "components/atoms/Typography/text";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";

const OnboardingButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 border border-slate-200 py-1 px-1 pr-3 rounded-lg">
      <ProgressPie percentage={30} />
      <Text className="text-sm font-semibold ">
        Complete the onboarding
      </Text>
    </button>
  );
};

export default OnboardingButton;