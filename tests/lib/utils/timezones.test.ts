import { getTimezone } from "lib/utils/timezones";

describe("[lib] getTimezone()", () => {

  it("Should return the offset of a timezone", () => {
    const result = getTimezone("Tonga Standard Time");

    expect(result).toEqual(13);

    const result2 = getTimezone("Pacific Standard Time");

    expect(result2).toEqual(-8);
  });

  it("Should return +1 if timezone is not found", () => {
    const result = getTimezone("Not a timezone");

    expect(result).toEqual(1);
  });
});
