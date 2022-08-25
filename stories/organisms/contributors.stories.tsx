import Contributors from "components/organisms/Contributors/contributors";

const StoryConfig = {
  title: "Design System/Organisms/Contributors",
};
export default StoryConfig;

const ContributorsTemplate = (): JSX.Element => <Contributors />;
export const ContributorsStory = ContributorsTemplate.bind({});

