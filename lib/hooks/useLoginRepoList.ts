import { useState } from "react";

const useLoginRepoList = () => {
  const defaultRepoList = [
    {
      repoOwner: "statelyai",
      repoName: "xstate",
      repoIcon: ""
    },
    {
      repoOwner: "vercel",
      repoName: "next.js",
      repoIcon: ""
    },
    {
      repoOwner: "vitejs",
      repoName: "vite",
      repoIcon: ""
    },
    {
      repoOwner: "solidjs",
      repoName: "solid",
      repoIcon: ""
    },
    {
      repoOwner: "sveltejs",
      repoName: "kit",
      repoIcon: ""
    }
  ];

  const [repoList, setRepoList] = useState(defaultRepoList);

  return {
    repoList,
    setRepoList
  };
};

export default useLoginRepoList;