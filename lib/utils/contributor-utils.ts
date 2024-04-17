export function getTopContributorLanguages(contributor: DbUser) {
  // Note that it's possible for a user to have no languages
  const languages: { language: string; percentageUsed: number }[] = Object.entries(contributor.languages).map(
    ([language, percentageUsed]) => ({ language, percentageUsed: percentageUsed })
  );
  const langArray = languages.slice().sort((a, b) => b.percentageUsed - a.percentageUsed);
  const sortedLangArray = langArray
    .sort((a, b) => (a.percentageUsed < b.percentageUsed ? 1 : -1))
    .slice(0, 2)
    .map((lang) => lang.language);

  return sortedLangArray;
}
