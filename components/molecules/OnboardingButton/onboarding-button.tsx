import React from "react";
import { useRouter } from "next/router";
import ProgressPie from "components/atoms/ProgressPie/progress-pie";

interface OnboardingButtonProps {
  className?: string;
  children?: React.ReactNode;
  aria?: string;
  ariaLabel?: string;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({ className, children, aria, ariaLabel }) => {
  const router = useRouter();
  return (
    <button
      aria-labelledby={aria}
      aria-label={ariaLabel}
      onClick={() => router.push("/start")}
      className={`${className} hidden items-center gap-2 border border-light-orange-8 py-1 px-1 pr-3 rounded-lg md:flex`}
    >
      <ProgressPie percentage={66} />
      {children}
    </button>
  );
};

export default OnboardingButton;
