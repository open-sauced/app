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
      name: "Commits",
      numOf: 4308
    },
    {
      name: "Issues",
      numOf: 45
    },
    {
      name: "Pull Requests",
      numOf: 13
    },
    {
      name: "People",
      numOf: 54
    }
  ];

  const { filterName, toolName: selectedTool } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    filterName
  };
};

export default useNav;