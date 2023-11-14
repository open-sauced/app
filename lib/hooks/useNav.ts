import { useRouter } from "next/router";
import useContributors from "./api/useContributors";

const useNav = (repositories: number[] = []) => {
  const router = useRouter();
  const { meta: conMetaData } = useContributors(10, repositories);

  const defaultTools = [
    {
      name: "Dashboard",
    },
    {
      name: "Reports",
    },
    {
      name: "Contributors",
      numOf: conMetaData.itemCount,
    },
    {
      name: "Activity",
    },
  ];

  const { pageId, toolName: selectedTool, selectedFilter, userOrg } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    selectedFilter,
    filterName: pageId,
    userOrg,
  };
};

export default useNav;
