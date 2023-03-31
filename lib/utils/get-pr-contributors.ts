const getPullRequestsContributors = (repositoryPullRequests: DbRepoPR[]) => {
  const uniqueContributors = Object.keys(repositoryPullRequests
    .filter(pr => !pr.author_login.includes("[bot]"))
    .reduce((contributors, pull_request) => {
      return {
        ...contributors,
        [pull_request.author_login]: true
      };
    }, {}));

  const contributorData = uniqueContributors.map(author => ({ host_login: author }));

  return contributorData;
};

export default getPullRequestsContributors;