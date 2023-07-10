import { Meta, StoryFn } from "@storybook/react";
import FeaturedHighlightsPanel from "components/molecules/FeaturedHighlightsPanel/featured-highlights-panel";

const storyConfig = {
  title: "Design System/Molecules/FeaturedHighlightsPanel",
} as Meta<typeof FeaturedHighlightsPanel>;

export default storyConfig;

const sampleHighlights: DbHighlight[] = [
  {
    id: "1",
    name: "OAuth, never missing a chance to surprise! 🍕",
    title: "OAuth, never missing a chance to surprise! 🍕",
    url: "supabase/supabase",
    highlight: "supabase",
    user_id: "1",
    created_at: "2021-08-24T09:00:00.000Z",
    updated_at: "2021-08-24T09:00:00.000Z",
    login: "supabase",
    shipped_at: "2021-08-24T09:00:00.000Z",
    pinned: false,
    deleted_at: "2021-08-24T09:00:00.000Z",
  },
  {
    id: "2",
    name: "OAuth, never missing a chance to surprise! 🍕",
    title: "OAuth, never missing a chance to surprise! 🍕",
    url: "supabase/supabase",
    highlight: "supabase",
    user_id: "1",
    created_at: "2021-08-24T09:00:00.000Z",
    updated_at: "2021-08-24T09:00:00.000Z",
    login: "supabase",
    shipped_at: "2021-08-24T09:00:00.000Z",
    pinned: false,
    deleted_at: "2021-08-24T09:00:00.000Z",
  },
];

const FeaturedHighlightsPanelTemplate: StoryFn<typeof FeaturedHighlightsPanel> = (args) => (
  <FeaturedHighlightsPanel {...args} />
);

export const Default = FeaturedHighlightsPanelTemplate.bind({});

Default.args = {
  highlights: sampleHighlights,
};
