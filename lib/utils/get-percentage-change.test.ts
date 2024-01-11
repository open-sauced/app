import getPercentageChange from "./get-percentage-change";

describe("[lib] getPercentageChange()", () => {
  it("Should return correct percentages", () => {
    expect(getPercentageChange(100, 50)).toEqual(50);
    expect(getPercentageChange(100, 25)).toEqual(75);
    expect(getPercentageChange(100, 75)).toEqual(25);
    expect(getPercentageChange(100, 0)).toEqual(100);
    expect(getPercentageChange(100, 100)).toEqual(0);
  });
});
