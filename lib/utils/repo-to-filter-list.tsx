export type HighlightReposType = { repoName: string; repoIcon: string; full_name: string };
const repoTofilterList = (repos: { full_name: string }[]): HighlightReposType[] => {
  const filtersArray = repos.map(({ full_name }) => {
    const [orgName, repo] = full_name.split("/");
    const repoFullName = `${orgName}/${repo}`;
    return { repoName: repo, repoIcon: `https://www.github.com/${orgName}.png?size=300`, full_name: repoFullName };
  });
  const jsonObject = filtersArray.map((arrayItem) => JSON.stringify(arrayItem));
  const uniqueSet = new Set(jsonObject);
  const uniqueFilteredArray = Array.from(uniqueSet).map((arrayItem) => JSON.parse(arrayItem));
  return uniqueFilteredArray;
};

export default repoTofilterList;
