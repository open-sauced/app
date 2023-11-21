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

  const { pageId, toolName, selectedFilter, userOrg } = router.query;

  let selectedTool = toolName;

  if (!toolName) {
    if (userOrg) {
      const url = new URL(router.asPath, "http://localhost:3000");
      selectedTool = url.pathname.split("/").pop() as string;
    } else {
      const url = new URL(router.asPath, "http://localhost:3000");
      selectedTool = url.pathname.split("/")[2];
    }
  }

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
