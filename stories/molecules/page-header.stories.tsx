import { ComponentStory } from "@storybook/react";
import PageHeader from "components/molecules/PageHeader/page-header";

const StoryConfig = {
  title: "Design System/Molecules/Page Header",
};

export default StoryConfig;

const PageHeaderTemplate: ComponentStory<typeof PageHeader> = (args) => <PageHeader {...args} />;

export const Default = PageHeaderTemplate.bind({});

Default.args = {
  title: "Repositories",
  leftComponent: <div className="">Left component</div>,
  rightComponent: <div className="">Right component</div>,
};
