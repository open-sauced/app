import { ComponentStory } from "@storybook/react";
import WaitlistButton from "../../components/molecules/WaitlistButton/waitlist-button";

const StoryConfig = {
  title: "Design System/Molecules/Waitlist Button",
};

export default StoryConfig;

const WaitlistButtonTemplate: ComponentStory<typeof WaitlistButton> = (args) => <WaitlistButton {...args} />;

export const Default = WaitlistButtonTemplate.bind({});
export const Submitting = WaitlistButtonTemplate.bind({});
export const Waitlisted = WaitlistButtonTemplate.bind({});

Default.args = {
  waitlisted: false,
};

Submitting.args = {
  waitlisted: false,
  submitting: true,
};

Waitlisted.args = {
  waitlisted: true,
};
