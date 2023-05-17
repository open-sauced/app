import { useFetchUser } from "../useFetchUser";

const useContributorLanguages = (username: string) => {
  const { data: contributor } = useFetchUser(username);

  const contributorLanguageTotal = Object.keys(contributor?.languages || {}).reduce((total, language) => {
    return (total += (contributor!.languages as { [lang: string]: number })[language]);
  }, 0);
  let contributorLanguageList = Object.keys(contributor?.languages || {}).map((lang) => {
    return {
      languageName: lang,
      percentageUsed: Math.round(
        ((contributor?.languages as { [lang: string]: number })[lang] / contributorLanguageTotal) * 100
      ),
    };
  });

  if (contributorLanguageList.length === 0) {
    contributorLanguageList = contributorLanguageList.concat({ languageName: "javascript", percentageUsed: 100 });
  }

  return contributorLanguageList;
};

export default useContributorLanguages;
