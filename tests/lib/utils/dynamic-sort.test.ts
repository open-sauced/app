import dynamicSort from "lib/utils/dynamic-sort";

describe("[lib] dynamicSort()", () => {
  const repos = [
    {name: "open-sauced", prVelocityCount: 1, spam: 1},
    {name: "react", prVelocityCount: 4, spam: 3},
    {name: "next.js", prVelocityCount: 7, spam: 4},
    {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0},
    {name: "Redwood", prVelocityCount: 8, spam: 5}
  ];

  it("should sort the repos by name in ascending order", () => {
    const result = repos.sort(dynamicSort("name"));
    const expected = [
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "open-sauced", prVelocityCount: 1, spam: 1},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "Redwood", prVelocityCount: 8, spam: 5}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos by name in descending order", () => {
    const result = repos.sort(dynamicSort("-name"));
    const expected = [
      {name: "Redwood", prVelocityCount: 8, spam: 5},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "open-sauced", prVelocityCount: 1, spam: 1},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos by prVelocityCount in ascending order", () => {
    const result = repos.sort(dynamicSort("prVelocityCount"));
    const expected = [
      {name: "open-sauced", prVelocityCount: 1, spam: 1},
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "Redwood", prVelocityCount: 8, spam: 5}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos by prVelocityCount in descending order", () => {
    const result = repos.sort(dynamicSort("-prVelocityCount"));
    const expected = [
      {name: "Redwood", prVelocityCount: 8, spam: 5},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0},
      {name: "open-sauced", prVelocityCount: 1, spam: 1}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos by spam in ascending order", () => {
    const result = repos.sort(dynamicSort("spam"));
    const expected = [
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0},
      {name: "open-sauced", prVelocityCount: 1, spam: 1},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "Redwood", prVelocityCount: 8, spam: 5}
    ];

    expect(result).toEqual(expected);
  });

  it("should sort the repos by spam in descending order", () => {
    const result = repos.sort(dynamicSort("-spam"));
    const expected = [
      {name: "Redwood", prVelocityCount: 8, spam: 5},
      {name: "next.js", prVelocityCount: 7, spam: 4},
      {name: "react", prVelocityCount: 4, spam: 3},
      {name: "open-sauced", prVelocityCount: 1, spam: 1},
      {name: "api.opensauced.pizza", prVelocityCount: 2, spam: 0}
    ];

    expect(result).toEqual(expected);
  });
});
