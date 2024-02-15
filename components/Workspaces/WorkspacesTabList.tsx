import TabsList from "components/TabList/tab-list";

type CapitalizeFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Lowercase<Rest>}`
  : S;
type TabName = "repositories" | "contributors" | "activity" | "highlights" | "settings";

const tabList: {
  name: CapitalizeFirstLetter<TabName>;
}[] = [{ name: "Repositories" }, { name: "Contributors" }, { name: "Settings" }];

interface WorkspacesTabListProps {
  selectedTab: TabName;
  workspaceId: string;
}

export const WorkspacesTabList = ({ selectedTab, workspaceId }: WorkspacesTabListProps) => {
  return <TabsList tabList={tabList} selectedTab={selectedTab} pageId={`/workspaces/${workspaceId}`} />;
};
