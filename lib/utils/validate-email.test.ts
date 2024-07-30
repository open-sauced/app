import { validateEmail } from "lib/utils/validate-email";

describe("[lib] validateEmail()", () => {
  it(".co domain return true if string is a valid email", () => {
    const testString = "nick@nickyt.co";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it(".me domain return true if string is a valid email", () => {
    const testString = "self@bjoern-buettner.me";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it(".site domain return true if string is a valid email", () => {
    const testString = "self@bjoern-buettner.site";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it(".yahoo domain return true if string is a valid email", () => {
    const testString = "ahmedatwa@yahoo.com";
    const result = validateEmail(testString);

    expect(result).toBeTruthy();
  });

  it("Should return false if string is not a valid email", () => {
    let testString = "ahmedatwayahoo.com";
    let result = validateEmail(testString);

    expect(result).toBeFalsy();
  });
});
