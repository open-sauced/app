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
  // returning mutable type array instead of `Read Only` type.
  return [...interests];
};
