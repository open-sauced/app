const interests = [
  "javascript",
  "python",
  "java",
  "typescript",
  "csharp",
  "cpp",
  "php",
  "c",
  "ruby",
  "ai",
  "ml",
  "react",
  "golang",
  "rust",
  "svelte",
  "vue",
  "kubernetes",
  "hacktoberfest",
  "clojure",
] as const;
export type InterestType = (typeof interests)[number];

export const getInterestOptions = () => {
  const isOctober = new Date().getMonth() === 9;

  return isOctober ? [...interests] : interests.filter((interest) => interest !== "hacktoberfest");
};
