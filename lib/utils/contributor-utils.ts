export function getTopContributorLanguages(contributor: DbUser) {
  // Note that it's possible for a user to have no languages
  const languages = Object.entries(contributor.languages).map(([language]) => language);

  return languages.sort((a, b) => (a < b ? -1 : 1)).slice(0, 2);
}
