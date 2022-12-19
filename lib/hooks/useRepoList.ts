const useRepoList = (repos: string) => {
  const repoList = repos.split(",").map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName,
      repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
    };
  });

  return repoList;
};

export default useRepoList;
