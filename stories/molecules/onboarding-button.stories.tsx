import React from 'react';
import { ComponentMeta } from "@storybook/react";
import OnboardingButton from "../../components/molecules/OnboardingButton/onboarding-button";

const storyConfig = {
  title: "Design System/Molecules/Onboarding Button",
  decorators: [
    (Story<typeof any) => (
      <div style={{ backgroundColor: "#222", padding: "1rem" }}>
        <Story />
      </div>
    )
  ]
};

export default storyConfig as ComponentMeta<typeof OnboardingButton>;

export const OnboardingButtonMolecule = () => <OnboardingButton />;