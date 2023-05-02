import { ComponentStory } from "@storybook/react";
import { Calendar } from "components/molecules/Calendar/calendar";

const storyConfig = {
  title: "Design System/Molecules/Calendar"
};
export default storyConfig;

const CalendarTemplate: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const Default = CalendarTemplate.bind({});

Default.args = {
  mode: "single",
  className: "border w-max rounded-md"
};
