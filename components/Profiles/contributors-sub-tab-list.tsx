import { useState } from "react";

export const contributionsOptions: { name: "Pull Requests" | "Issue Comments"; path: string }[] = [
  { name: "Pull Requests", path: "" },
  { name: "Issue Comments", path: "" },
];

export function useContributionsFilter() {
  const [selected, setSelected] = useState("Pull Requests");
  const showPRs = selected === "Pull Requests";
  const showIssueComments = selected === "Issue Comments";

  return { selected, setSelected, showPRs, showIssueComments };
}
