import TabsList from "components/TabList/tab-list";

type CapitalizeFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Lowercase<Rest>}`
  : S;
type TabName = "repositories" | "contributors" | "activity" | "highlights" | ""; // none (eg /settings)

const tabList: {
  name: CapitalizeFirstLetter<TabName>;
  path: string;
}[] = [
  { name: "Repositories", path: "" },
  { name: "Activity", path: "activity" },
];

interface WorkspacesTabListProps {
  selectedTab: TabName;
  workspaceId: string;
}

export const WorkspacesTabList = ({ selectedTab, workspaceId }: WorkspacesTabListProps) => {
  return <TabsList tabList={tabList} selectedTab={selectedTab} pageId={`/workspaces/${workspaceId}`} />;
};
