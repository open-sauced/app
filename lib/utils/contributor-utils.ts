export function getTopContributorLanguages(contributor: DbUser) {
  // some contributors will have empty language objects so we will pull their popular language from the interests field instead of defaulting to nothing
  const entries = Object.entries<string>(contributor.languages);
  const languages =
    entries.length > 0
      ? entries.map(([language]) => language)
      : contributor.interests.split(",").filter((interest) => interest !== "");

  return languages.sort((a, b) => (a < b ? -1 : 1)).slice(0, 2);
}
