import { ComponentMeta, ComponentStory } from "@storybook/react";
import NewsletterForm from "components/molecules/NewsletterForm/newsletter-form";

const storyConfig = {
  title: "Design System/Molecules/NewsletterForm",
} as ComponentMeta<typeof NewsletterForm>;

export default storyConfig;

const NewsletterFormTemplate: ComponentStory<typeof NewsletterForm> = (args) => <NewsletterForm />;

export const Default = NewsletterFormTemplate.bind({});
