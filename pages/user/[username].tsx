import { useRouter } from "next/router";
import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { useSingleContributor } from "lib/hooks/useSingleContributor";
import { ContributorsProfileType } from "components/molecules/ContributorHoverCard/contributor-hover-card";

const Contributor = () => {
  const router = useRouter();
  const { username } = router.query;
  const contributorLogin = username as string;

  const { data: contributor, isLoading: contributorLoading, isError } = useSingleContributor(contributorLogin);

  const repoList = (contributor[0]?.recent_repo_list || "").split(",").map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName,
      repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
    };
  });
  const contributorLanguageList = (contributor[0]?.langs || "").split(",");
  const profile: ContributorsProfileType = {
    githubAvatar: `https://www.github.com/${contributorLogin}.png?size=60`,
    githubName: contributorLogin,
    totalPR: contributor[0]?.recent_pr_total
  };
  console.log(contributor);
  return (
    <div>
      <ContributorProfilePage
        repoList={repoList}
        langList={contributorLanguageList}
        githubName={profile.githubName}
        githubAvatar={profile.githubAvatar}
        listOfPRs={[]}
      />
    </div>
  );
};

export default Contributor;
