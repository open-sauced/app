import { ComponentMeta, ComponentStory } from "@storybook/react";
import HighlightPrompt from "components/molecules/HighlightPrompt/highlight-prompt";

const storyConfig = {
  title: "Design System/Molecules/HighlightPrompt",
} as ComponentMeta<typeof HighlightPrompt>;

export default storyConfig;

const HighlightPromptTemplate: ComponentStory<typeof HighlightPrompt> = (args) => <HighlightPrompt {...args} />;

export const HighlightPromptStory = HighlightPromptTemplate.bind({});

HighlightPromptStory.args = {
  prompt: "What’s the code you are most proud of?",
};
