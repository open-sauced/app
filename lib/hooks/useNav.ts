import { useRouter } from "next/router";
import useStore from "lib/store";
import useRepositories from "./api/useRepositories";
import useContributors from "./api/useContributors";

const useNav = (repositories: number[] = []) => {
  const router = useRouter();
  const range = useStore(state => state.range);
  const { meta: repoMetaData } = useRepositories(repositories, range);
  const { meta: conMetaData } = useContributors(10, repositories, range);

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
