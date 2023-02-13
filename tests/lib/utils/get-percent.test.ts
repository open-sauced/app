import getPercent from "lib/utils/get-percent";

describe("[lib] getPercent()", () => {

  it("Should return correct percentages", () => {
    expect(getPercent(100, 50)).toEqual(50);
    expect(getPercent(100, 25)).toEqual(25);
    expect(getPercent(100, 75)).toEqual(75);
    expect(getPercent(100, 0)).toEqual(0);
    expect(getPercent(100, 100)).toEqual(100);
  });
});
