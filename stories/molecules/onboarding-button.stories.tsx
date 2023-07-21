import { ComponentStory } from "@storybook/react";
import OnboardingButton from "../../components/molecules/OnboardingButton/onboarding-button";

const StoryConfig = {
  title: "Design System/Molecules/Onboarding Button",
};

export default StoryConfig;

const OnboardingButtonTemplate: ComponentStory<typeof OnboardingButton> = (args) => <OnboardingButton {...args} />;

export const Default = OnboardingButtonTemplate.bind({});

Default.args = {};
