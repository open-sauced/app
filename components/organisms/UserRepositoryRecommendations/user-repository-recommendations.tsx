import { useEffect, useState } from "react";

import Button from "components/atoms/Button/button";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import LanguagePill from "components/atoms/LanguagePill/LanguagePill";
import Title from "components/atoms/Typography/title";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";

import useUserRepoRecommendations from "lib/hooks/useUserRepoRecommendations";
import { updateUser } from "lib/hooks/update-user";
import { useToast } from "lib/hooks/useToast";
import { getInterestOptions, interestsType } from "lib/utils/getInterestOptions";

interface UserRepoRecommendationsProps {
  contributor?: DbUser;
  userInterests?: string;
}

const UserRepositoryRecommendations = ({ contributor, userInterests }: UserRepoRecommendationsProps) => {
  const { data: userRecommendedRepos, mutate: refreshUserRecommendedRepos } = useUserRepoRecommendations();
  const interests = getInterestOptions();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showInterests, setShowInterests] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendedrepos, setRecommendedRepos] = useState<string[]>([]);

  const { toast } = useToast();

  const handleSelectInterest = (interest: string) => {
    if (selectedInterests.length > 0 && selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  const handleUpdateInterest = async () => {
    setLoading(true);

    const data = await updateUser({
      data: { interests: selectedInterests },
      params: "interests",
    });

    setLoading(false);

    if (data) {
      toast({ description: "Updated successfully", variant: "success" });
    } else {
      toast({ description: "An error occured!", variant: "danger" });
    }
  };

  const getRepoFullNameByInterests = () => {
    const repoFullNames = interests.map((interest) => {
      return userRecommendedRepos[interest as interestsType];
    });

    setRecommendedRepos(
      Array.from(
        new Set([
          ...repoFullNames
            .flat()
            .filter(Boolean)
            .map((repo) => repo.full_name),
        ])
      )
    );
  };

  useEffect(() => {
    if (userInterests && userInterests.length > 0) setSelectedInterests(userInterests.split(","));
    getRepoFullNameByInterests();
  }, [userInterests, userRecommendedRepos]);

  useEffect(() => {
    refreshUserRecommendedRepos();
  }, [contributor]);

  return (
    <>
      {userInterests && userInterests.length > 0 ? (
        <div className="space-y-2 ">
          <Title className="!font-normal my-6" level={5}>
            Here are some repositories we think would be great for you. Click on one that you like and start
            contributing!
          </Title>
          <div className="flex flex-wrap gap-4">
            {recommendedrepos.map((repo, i) => (
              <RecommendedRepoCard className="md:w-[45%]" key={i.toString()} fullName={repo} />
            ))}
            {recommendedrepos.length <= 1 && (
              <RecommendedRepoCard className="md:w-[45%]" fullName="open-sauced/insights" />
            )}
          </div>
        </div>
      ) : (
        <DashContainer>
          {/* Empty Interest state */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-normal text-center">
              If you're just getting started, recommendations are a great to find projects and start making
              contributions on repositories.
              <br /> <br /> Select some interests and we give you some recommendations!
            </p>

            {showInterests && (
              <div className="flex flex-wrap justify-center w-full gap-2 mt-6 md:max-w-sm">
                {interests.map((topic, index) => (
                  <LanguagePill
                    onClick={() => handleSelectInterest(topic)}
                    classNames={`${(selectedInterests || []).includes(topic) && "bg-light-orange-10 text-white"}`}
                    topic={topic}
                    key={index}
                  />
                ))}
              </div>
            )}
            {showInterests ? (
              <Button loading={loading} className="mt-4" onClick={handleUpdateInterest} variant="primary">
                Save Interests
              </Button>
            ) : (
              <Button onClick={() => setShowInterests(true)} variant="primary">
                Select Interests
              </Button>
            )}
          </div>
        </DashContainer>
      )}
    </>
  );
};

export default UserRepositoryRecommendations;
