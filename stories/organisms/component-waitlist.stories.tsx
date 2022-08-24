import ComponentWaitlist from "components/organisms/Waitlist/waitlist";

const StoryConfig = {
  title: "Design System/Organisms/ComponentWaitlist"
};
export default StoryConfig;

const ComponentWaitlistTemplate: React.FC<typeof ComponentWaitlist> = (args) => <ComponentWaitlist {...args} />;
export const WaitlistComponent = ComponentWaitlistTemplate.bind({});
