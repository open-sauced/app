import differenceInDays from "date-fns/differenceInDays";

const getContributorPullRequestVelocity = (repositoryPullRequests: DbRepoPR[]) => {
  const mergedPRs = repositoryPullRequests.filter((prState) => prState.state.toLowerCase() === "merged");

  const totalDays = mergedPRs.reduce((total, pr) => {
    const daysBetween = differenceInDays(new Date(pr.closed_at), new Date(pr.created_at));
    return (total += daysBetween);
  }, 0);

  const averageVelocity = mergedPRs.length > 0 ? totalDays / mergedPRs.length : undefined;

  if (averageVelocity && averageVelocity < 1) {
    return 1;
  }

  return averageVelocity ? Math.floor(averageVelocity) : averageVelocity;
};

export default getContributorPullRequestVelocity;
