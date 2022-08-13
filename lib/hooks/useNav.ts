import { useRouter } from "next/router";

const useNav = () => {
  const router = useRouter();

  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Activity"
    },
    {
      name: "Repositories",
      numOf: 20
    },
    {
      name: "Contributors",
      numOf: 54
    }
  ];

  const { filterName, toolName: selectedTool, selectedFilter } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    selectedFilter,
    filterName
  };
};

export default useNav;