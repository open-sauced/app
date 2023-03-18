import { ComponentStory } from "@storybook/react";
import RepositoryTable from "../../components/molecules/RepositoryTable/repository-table";

const storyConfig = {
  title: "Design System/Molecules/Repository Table",
  component: "RepositoryTable"
};

export default storyConfig;

const testRows = [
  {
    id: "test",
    name: "freecodecamp",
    stars: 100,
    size: 30984
  },
  {
    id: "test",
    name: "free-programming-books",
    stars: 60,
    size: 30984
  },
  {
    id: "test",
    name: "material-ui",
    stars: 20,
    size: 30984
  },
  {
    id: "test",
    name: "react",
    stars: 100,
    size: 30984
  },
  {
    id: "test",
    name: "java-design-patterns",
    stars: 20,
    size: 30984
  }
] as DbRepo[];

// SelectableTable Template
const RepositoryTableTemplate: ComponentStory<typeof RepositoryTable> = (args) => <RepositoryTable {...args} />;

// SelectableTable Default
export const Default = RepositoryTableTemplate.bind({});
Default.args = {title: "Test Title", tableType: "participants", rows: testRows };
