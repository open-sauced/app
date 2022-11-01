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
          <SuggestedRepository
            avatar={
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
            }
            prCount={23}
            issueCount={113}
            orgName="open sauced"
            key={`${item}/${Math.random()}/${index}`}
            repoName="insignts"
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedRepositoriesList;
