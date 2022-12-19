const useRepoList = (repos: string) => {
  return repos.split(",").map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName,
      repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
    };
  });
};

export default useRepoList;
