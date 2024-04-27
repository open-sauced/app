import { validateEmail } from "lib/utils/validate-email";

describe("[lib] validateEmail()", () => {
  it("Should return true if string is a valid email", () => {
    const testString = "ahmedatwa@yahoo.com";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it("(regression #3271) #1 Should return true if string is a valid email", () => {
    const testString = "self@bjoern-buettner.me";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it("(regression #3271) #2 Should return true if string is a valid email", () => {
    const testString = "self@bjoern-buettner.site";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it("Should return false if string is not a valid email", () => {
    let testString = "ahmedatwayahoo.com";
    let result = validateEmail(testString);

    expect(result).toBeFalsy();

    testString = "ahmedatwa@yahoo";

    result = validateEmail(testString);
    expect(result).toBeFalsy();
  });
});
