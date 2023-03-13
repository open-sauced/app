const interests = ["javascript", "python", "java", "typescript", "csharp", "cpp", "php", "c", "ruby" , "ai", "ml", "react"] as const;
export type interestsType = typeof interests[number];

export const getInterestOptions = () => {
  return interests;
};

