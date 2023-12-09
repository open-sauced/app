import { ComponentMeta, ComponentStory } from "@storybook/react";
import DevCardCarousel from "components/organisms/DevCardCarousel/dev-card-carousel";
import { STUB_DEV_CARDS } from "components/organisms/DevCardCarousel/stubData";

const storyConfig = {
  title: "Design System/Organisms/DevCardCarousel",
  component: DevCardCarousel,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
} as ComponentMeta<typeof DevCardCarousel>;

export default storyConfig;

const DevCardTemplate: ComponentStory<typeof DevCardCarousel> = (args) => <DevCardCarousel {...args} />;
export const DevCardCarouselStory = DevCardTemplate.bind({});

DevCardCarouselStory.args = {
  cards: [...STUB_DEV_CARDS],
};
