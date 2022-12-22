import getTotalPrs from "lib/utils/get-total-prs";

describe("[lib] getTotalPRs()", () => {
  const repos = [
    {name: "open-sauced", openPrsCount: 6, mergedPrsCount: 3, closedPrsCount: 1, draftPrsCount: 2},
    {name: "react", openPrsCount: 9, mergedPrsCount: 5, closedPrsCount: 3, draftPrsCount: 4},
    {name: "next.js", openPrsCount: 13, mergedPrsCount: 7, closedPrsCount: 2, draftPrsCount: 1},
    {name: "api.opensauced.pizza", openPrsCount: 2, mergedPrsCount: 0, closedPrsCount: 0, draftPrsCount: 0}
  ];

  it("should sort the repos based of the number of total prs in ascending order", () => {
    const result = repos.sort((a, b) => getTotalPrs(a.openPrsCount, a.mergedPrsCount, a.closedPrsCount, a.draftPrsCount) - getTotalPrs(b.openPrsCount, b.mergedPrsCount, b.closedPrsCount, b.draftPrsCount));

    const expected = [
      {name: "api.opensauced.pizza", openPrsCount: 2, mergedPrsCount: 0, closedPrsCount: 0, draftPrsCount: 0},
      {name: "open-sauced", openPrsCount: 6, mergedPrsCount: 3, closedPrsCount: 1, draftPrsCount: 2},
      {name: "react", openPrsCount: 9, mergedPrsCount: 5, closedPrsCount: 3, draftPrsCount: 4},
      {name: "next.js", openPrsCount: 13, mergedPrsCount: 7, closedPrsCount: 2, draftPrsCount: 1}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos based of the number of total prs in descending order", () => {
    const result = repos.sort((a, b) => getTotalPrs(b.openPrsCount, b.mergedPrsCount, b.closedPrsCount, b.draftPrsCount) - getTotalPrs(a.openPrsCount, a.mergedPrsCount, a.closedPrsCount, a.draftPrsCount));

    const expected = [
      {name: "next.js", openPrsCount: 13, mergedPrsCount: 7, closedPrsCount: 2, draftPrsCount: 1},
      {name: "react", openPrsCount: 9, mergedPrsCount: 5, closedPrsCount: 3, draftPrsCount: 4},
      {name: "open-sauced", openPrsCount: 6, mergedPrsCount: 3, closedPrsCount: 1, draftPrsCount: 2},
      {name: "api.opensauced.pizza", openPrsCount: 2, mergedPrsCount: 0, closedPrsCount: 0, draftPrsCount: 0}
    ];

    expect(result).toEqual(expected);
  });
});
