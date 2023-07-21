import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ComponentStory } from "@storybook/react";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";

const storyConfig = {
  title: "Design System/molecules/HighlightInputForm",
};
export default storyConfig;

const HighlightInputTemplate: ComponentStory<typeof HighlightInputForm> = () => (
  <TooltipProvider>
    <HighlightInputForm />
  </TooltipProvider>
);

export const Default = HighlightInputTemplate.bind({});
