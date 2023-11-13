import { useRouter } from "next/router";
import useRepositories from "./api/useRepositories";
import useContributors from "./api/useContributors";

const useNav = (repositories: number[] = []) => {
  const router = useRouter();
  const { meta: repoMetaData } = useRepositories(repositories);
  const { meta: conMetaData } = useContributors(10, repositories);

  const defaultTools = [
    {
      name: "Dashboard",
    },
    {
      name: "Reports",
    },
    {
      name: "Repositories",
      numOf: repoMetaData.itemCount,
    },
    {
      name: "Contributors",
      numOf: conMetaData.itemCount,
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
