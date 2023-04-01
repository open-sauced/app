import { useRouter } from "next/router";
import useRepositories from "./api/useRepositories";
import { useTopicContributions } from "./useTopicContributions";


const useNav = (repositories: number[] = []) => {
  const router = useRouter();
  const { meta: repoMetaData } = useRepositories(repositories);
  const { meta: conMetaData } = useTopicContributions(10, repositories);

  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Repositories",
      numOf: repoMetaData.itemCount
    },
    {
      name: "Contributors",
      numOf: conMetaData.itemCount
    }
  ];

  const { filterName, toolName: selectedTool, selectedFilter, userOrg } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    selectedFilter,
    filterName,
    userOrg
  };
};

export default useNav;
