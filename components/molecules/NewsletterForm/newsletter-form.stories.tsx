import { ComponentMeta, ComponentStory } from "@storybook/react";
import NewsletterLink from "components/molecules/NewsletterForm/newsletter-form";

const storyConfig = {
  title: "Design System/Molecules/NewsletterForm",
} as ComponentMeta<typeof NewsletterLink>;

export default storyConfig;

const NewsletterFormTemplate: ComponentStory<typeof NewsletterLink> = (args) => <NewsletterLink />;

export const Default = NewsletterFormTemplate.bind({});
