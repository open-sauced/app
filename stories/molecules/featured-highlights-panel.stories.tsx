import { ComponentMeta, ComponentStory } from "@storybook/react";
import FeaturedHighlightsPanel from "components/molecules/FeaturedHighlightsPanel/featured-highlights-panel";

const storyConfig = {
  title: "Design System/Molecules/FeaturedHighlightsPanel",
} as ComponentMeta<typeof FeaturedHighlightsPanel>;

export default storyConfig;

const sampleHighlights = [
  { id: 1, title: "OAuth, never missing a chance to surprise! 🍕" },
  { id: 106, title: "Replaced Supabase ui checkbox with Radix UI for better performance" },
  { id: 106, title: "Even docs can experience breaking changes! 😅" },
];

const FeaturedHighlightsPanelTemplate: ComponentStory<typeof FeaturedHighlightsPanel> = (args) => (
  <FeaturedHighlightsPanel {...args} />
);

export const Default = FeaturedHighlightsPanelTemplate.bind({});

Default.args = {
  highlightIds: sampleHighlights,
};
