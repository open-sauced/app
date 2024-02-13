import differenceInDays from "date-fns/differenceInDays";

const getContributorPullRequestVelocity = (repositoryPullRequests: DbRepoPREvents[]) => {
  const mergedPRs = repositoryPullRequests.filter((prState) => prState.pr_is_merged);

  const totalDays = mergedPRs.reduce((total, event) => {
    const daysBetween = differenceInDays(new Date(event.pr_closed_at), new Date(event.pr_created_at));
    return (total += daysBetween);
  }, 0);

  const averageVelocity = mergedPRs.length > 0 ? totalDays / mergedPRs.length : undefined;

  if (averageVelocity && averageVelocity < 1) {
    return 1;
  }

  return averageVelocity ? Math.floor(averageVelocity) : averageVelocity;
};

export default getContributorPullRequestVelocity;
