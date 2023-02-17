const getRepoInsights = (repos: DbRepo[]) => {
  const repoList = repos.map(repo => {
    const [owner, name] = repo.full_name.split('/');
    return {
      repoIcon: `https://github.com/${owner}.png?size=60`,
      repoName: name,
      repoOwner: owner
    };
  });

  const repoTotals = repos.reduce((totals, curr) => {
    const merged = (totals["merged"] || 0) + (curr.mergedPrsCount || 0);
    const opened = (totals["opened"] || 0) + (curr.openPrsCount || 0);
    const closed = (totals["closed"] || 0) + (curr.closedPrsCount || 0);
    const drafts = (totals["drafts"] || 0) + (curr.draftPrsCount || 0);
    const churn = (totals["churn"] || 0) + (curr.churnTotalCount || 0);
    const velocity = (totals["velocity"] || 0) + (curr.prVelocityCount || 0);
    const total = (totals["total"] || 0);

    return {
      merged,
      opened,
      closed,
      drafts,
      churn,
      velocity,
      total: total + merged + opened + closed + drafts
    };
  }, {} as Record<"opened" | "merged" | "closed" | "drafts" | "churn" | "velocity" | "total", number>);

  return {
    repoList,
    open: repoTotals["opened"] || 0,
    merged: repoTotals["merged"] || 0,
    closed: repoTotals["closed"] || 0,
    drafts: repoTotals["drafts"] || 0,
    total: repoTotals["total"] || 0,
    velocity: repoTotals["velocity"] || 0,
    churn: repoTotals["churn"] || 0
  };
};

export default getRepoInsights;