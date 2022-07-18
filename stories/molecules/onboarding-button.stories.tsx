import React from "react";
import { ComponentMeta } from "@storybook/react";
import OnboardingButton from "../../components/molecules/OnboardingButton/onboarding-button";

export default {
  title: "Design System/Molecules/Onboarding Button",
  component: OnboardingButton,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#222", padding: "1rem" }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof OnboardingButton>;