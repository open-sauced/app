import Title from "components/atoms/Typography/title";
import SuggestedRepository from "components/molecules/SuggestedRepo/suggested-repo";
import React from "react";

const SuggestedRepositoriesList = () => {
  // Random array to be replaced with real repositories data
  const randomSuggestions = Array.apply(null, Array(3));
  return (
    <div>
      <Title className="!text-light-slate-11 !text-sm" level={4}>
        Suggested Repositories:
      </Title>

      <div className="mt-6 flex flex-col gap-3 border-b pb-10">
        {randomSuggestions.map((item, index) => (
          <SuggestedRepository key={`${item}/${Math.random()}/${index}`} repoName={""} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedRepositoriesList;
