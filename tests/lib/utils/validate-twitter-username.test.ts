import { validateTwitterUsername } from "lib/utils/validate-twitter-username";

describe("[lib] validateTwitterUsername()", () => {

  it("Should return true if string is a valid d", () => {
    const testString = "doaortu_valid";
    const result = validateTwitterUsername(testString);

    expect(result.message).toEqual("");
    expect(result.valid).toBeTruthy();
  });

  it("Should return false if string is less than 1 char or more than 15 chars", () => {
    let testString = "";
    let result = validateTwitterUsername(testString);

    expect(result.valid).toBeFalsy();
    expect(result.message).toEqual("Username must be between 1 and 15 characters");

    testString = "doaortu_morethan15chars";

    result = validateTwitterUsername(testString);
    expect(result.valid).toBeFalsy();
    expect(result.message).toEqual("Username must be between 1 and 15 characters");
  });

  it("Should return false if string contains reserved word 'admin' or 'twitter'", () => {
    let testString = "aaAdmiNaa";
    let result = validateTwitterUsername(testString);

    expect(result.valid).toBeFalsy();
    expect(result.message).toEqual("Username contains reserved word 'admin' or 'twitter'");

    testString = "OntwIttEr";
    result = validateTwitterUsername(testString);

    expect(result.valid).toBeFalsy();
    expect(result.message).toEqual("Username contains reserved word 'admin' or 'twitter'");
  });

  it("Should return false if string contains non-alphanumeric characters", () => {
    let testString = "doaortu@://";
    let result = validateTwitterUsername(testString);

    expect(result.valid).toBeFalsy();
    expect(result.message).toEqual("Username can only contain letters, numbers, and underscores");
  })
});
