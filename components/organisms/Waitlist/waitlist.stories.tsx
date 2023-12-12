import WaitlistComponent from "components/organisms/Waitlist/waitlist";

const StoryConfig = {
  title: "Design System/Organisms/WaitlistComponent",
};
export default StoryConfig;

const WaitlistComponentTemplate: React.FC<typeof WaitlistComponent> = (args) => <WaitlistComponent {...args} />;
export const Waitlist = WaitlistComponentTemplate.bind({});
