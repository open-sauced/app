import { ComponentStory } from "@storybook/react";
import Error from "../../components/atoms/Error/Error";

const storyConfig = {
  title: "Design System/Atoms/Error",
  argTypes: {
    type: {
      options: ["default", "full-wide"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;

const ErrorTemplate: ComponentStory<typeof Error> = (args) => <Error {...args}>Error</Error>;

export const ButtonTypes: ComponentStory<typeof Error> = (args) => (
  <div className="flex flex-col gap-y-2">
    <div>
      <Error fullWidth={false} errorMessage={"Something went wrong"} />
    </div>

    <div>
      <Error fullWidth={true} errorMessage={"Something went wrong"} />
    </div>
  </div>
);

export const Default = ErrorTemplate.bind({});
Default.args = { fullWidth: false };

export const FullWide = ErrorTemplate.bind({});
FullWide.args = { fullWidth: true };