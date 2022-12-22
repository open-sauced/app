/**
 * This function returns the total number of PRs
 * @param openPrsCount the number of open PRs
 * @param mergedPrsCount the number of merged PRs
 * @param closedPrsCount the number of closed PRs
 * @param draftPrsCount the number of draft PRs
 * @returns the total number of PRs
 */
const getTotalPrs = (
  openPrsCount?: number,
  mergedPrsCount?: number,
  closedPrsCount?: number,
  draftPrsCount?: number
): number => {
  const open = openPrsCount || 0;
  const merged = mergedPrsCount || 0;
  const closed = closedPrsCount || 0;
  const drafts = draftPrsCount || 0;

  const total = open + closed + merged - drafts;

  if (total <= 0) {
    return 0;
  }

  return total;
};

export default getTotalPrs;
