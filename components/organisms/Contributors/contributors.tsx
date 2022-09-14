import { useContributionsList } from "lib/hooks/useContributionsList";
import useContributorData from "lib/hooks/useContributorData";
import { calcMonthsFromToday } from "lib/utils/date-utils";
import ContributorCard from "../ContributorCard/contributor-card";

const Contributors = (): JSX.Element =>{
  const contributorData = useContributorData();
  const { data, isError, isLoading } = useContributionsList();
  
  const contributorArray = isError ? [] : data?.map(contributor => {
    const timeSinceFirstCommit = calcMonthsFromToday(new Date(parseInt(contributor.first_commit_time)));
    const contributorLanguageList = contributor.langs.split(",");

    return {
      ...contributorData,
      profile: {
        ...contributorData.profile,
        //githubAvatar: `https://avatars.githubusercontent.com/u/${put user name here}`,
        githubName: contributor.name,
        dateOfFirstPR: `${timeSinceFirstCommit}${timeSinceFirstCommit !== 1 ? "mos" : "mo"}`
      },
      languageList: contributorLanguageList.map(language => {
        return {
          languageName: language,
          percentageUsed: Math.round( ( 1 / contributorLanguageList.length ) * 100)
        };
      })
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