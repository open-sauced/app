const getRepoInsights = (repos: DbRepo[]) => {
  const repoList = repos.map(repo => {
    const [repoOwner, repoName] = repo.full_name.split("/");

    return {
      repoIcon: `https://github.com/${repoOwner}.png?size=60`,
      repoName,
      repoOwner
    };
  });

  const repoTotals = repos.reduce((totals, curr) => {
    const merged = (totals["merged"] || 0) + (curr.merged_prs_count || 0);
    const opened = (totals["opened"] || 0) + (curr.open_prs_count || 0);
    const closed = (totals["closed"] || 0) + (curr.closed_prs_count || 0);
    const drafts = (totals["drafts"] || 0) + (curr.draft_prs_count || 0);
    const churn = (totals["churn"] || 0) + (curr.churnTotalCount || 0);
    const velocity = (totals["velocity"] || 0) + (curr.pr_velocity_count || 0);
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