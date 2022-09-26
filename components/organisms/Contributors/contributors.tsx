import useContributorData from "lib/hooks/useContributorData";
import { calcMonthsFromToday } from "lib/utils/date-utils";
import ContributorCard from "../ContributorCard/contributor-card";
import color from "lib/utils/color.json";
import { useTopicContributions } from "lib/hooks/useTopicContributions";

const colorKeys = Object.keys(color);

const Contributors = (): JSX.Element => {
  const contributorData = useContributorData();
  const { data, isError, isLoading } = useTopicContributions();

  const contributorArray = isError
    ? []
    : data?.map((contributor) => {
      const timeSinceFirstCommit = calcMonthsFromToday(new Date(parseInt(contributor.first_commit_time)));
      const contributorLanguageList = (contributor.langs || "").split(",");
      const repoList = (contributor.recent_repo_list || "").split(",").map((repo) => {
        const [repoOwner, repoName] = repo.split("/");

        return {
          repoName,
          repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
        };
      });
      const languageList = contributorLanguageList.map((language) => {
        const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.toLowerCase());

        return {
          languageName: preparedLanguageKey ? preparedLanguageKey : language,
          percentageUsed: Math.round((1 / contributorLanguageList.length) * 100)
        };
      });

      return {
        ...contributorData,
        profile: {
          ...contributorData.profile,
          githubAvatar: `https://www.github.com/${contributor.host_login}.png?size=60`,
          githubName: contributor.host_login,
          dateOfFirstPR: `${timeSinceFirstCommit}${timeSinceFirstCommit !== 1 ? "mos" : "mo"}`
        },
        languageList,
        repoList
      };
    });

  return (
    <div className="w-full grid grid-cols-automobile  md:grid-cols-autodesktop gap-3">
      {isLoading ? "Loading..." : ""}
      {contributorArray.map((contributor, index) => (
        <ContributorCard key={index} className="" contributor={{ ...contributor }} />
      ))}
    </div>
  );
};
export default Contributors;
