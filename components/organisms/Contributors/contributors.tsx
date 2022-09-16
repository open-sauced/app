import { useContributionsList } from "lib/hooks/useContributionsList";
import useContributorData from "lib/hooks/useContributorData";
import { calcMonthsFromToday } from "lib/utils/date-utils";
import ContributorCard from "../ContributorCard/contributor-card";
import color from "lib/utils/color.json";

const Contributors = (): JSX.Element =>{
  const contributorData = useContributorData();
  const { data, isError, isLoading } = useContributionsList();

  const freeCodeCampLogo = "https://avatars.githubusercontent.com/u/9892522?v=4";
  
  const contributorArray = isError ? [] : data?.map(contributor => {
    const timeSinceFirstCommit = calcMonthsFromToday(new Date(parseInt(contributor.first_commit_time)));
    const contributorLanguageList = contributor.langs.split(",");

    return {
      ...contributorData,
      profile: {
        ...contributorData.profile,
        githubAvatar: `https://www.github.com/${contributor.host_login}.png?size=60`,
        githubName: contributor.host_login,
        dateOfFirstPR: `${timeSinceFirstCommit}${timeSinceFirstCommit !== 1 ? "mos" : "mo"}`
      },
      languageList: contributorLanguageList.map(language => {
        const preparedLanguageKey = Object.keys(color).find(key => key.toLowerCase() === language.toLowerCase());

        return {
          languageName: preparedLanguageKey ? preparedLanguageKey : language,
          percentageUsed: Math.round( ( 1 / contributorLanguageList.length ) * 100)
        };
      }),
      repoList: [
        {
          repoName: "freeCodeCamp",
          repoIcon: freeCodeCampLogo
        }
      ]
    };
  });

  return (
    <div className="w-full grid grid-cols-automobile  md:grid-cols-autodesktop gap-3">
      {isLoading ? "Loading..." : ""}
      {
        contributorArray.map((contributor, index) => (
          <ContributorCard key={index} className="" contributor={{ ...contributor }} />
        ))
      }
    </div>
  );
};
export default Contributors; 