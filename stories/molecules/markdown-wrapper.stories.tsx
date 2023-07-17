import { ComponentStory } from "@storybook/react";
import MarkdownWrapper from "../../components/molecules/MarkdownWrapper/markdown-wrapper";

const storyConfig = {
  title: "Design System/molecules/MarkdownWrapper",
};
export default storyConfig;

const testMarkdownContent = `
# Heading 1 (h1) 
## Heading 2 (h2)
### Heading 3 (h3)

This is a paragraph.

Test **bold** and *italic* text.

This is a [link to Open Sauced](https://opensauced.pizza/).

Code block:
\`\`\`js
const test = "test";
console.log(test);
\`\`\`
`;

const MarkdownWrapperTemplate: ComponentStory<typeof MarkdownWrapper> = () => (
  <MarkdownWrapper content={testMarkdownContent} />
);

export const Default = MarkdownWrapperTemplate.bind({});
