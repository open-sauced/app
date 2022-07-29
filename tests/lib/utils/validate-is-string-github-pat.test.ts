import validateIsStringGitHubPAT from "lib/utils/validate-is-string-github-pat";

describe("[lib] validateGitHubPAT()", () => {

  it("Should return true if string looks like a GitHub Personal Access Token", () => {
    const testString = "ghp_TestStringas09Dsaasdfaljm0d32dasdfas";
    const result = validateIsStringGitHubPAT(testString);

    expect(result).toBeTruthy();
  });

  it("Should return false if string is missing ghp_ at beginning", () => {
    let testString = "TestStringas09Dsaasdfaljm0d32dasdfas";
    let result = validateIsStringGitHubPAT(testString);

    expect(result).toBeFalsy();

    testString = "TestStrghp_ingas09Dsaasdfaljm0d32dasdfas";

    result = validateIsStringGitHubPAT(testString);
    expect(result).toBeFalsy();

    testString = "TestStringas09Dsaasdfaljm0d32dasdfasghp_";

    result = validateIsStringGitHubPAT(testString);
    expect(result).toBeFalsy();
  });

  it("Should return false if string is not exactly 40 characters", () => {
    const testString = "ghp_TestStringas09Dsaasdfaljm0d32dasdfa";
    const result = validateIsStringGitHubPAT(testString);

    expect(result).toBeFalsy();
  });

  it("Should return false if string after ghp_ has characters other than alphanumeric characters", () => {
    const testString = "ghp_TestStringas09Dsaasdfal-m0d32dasdfas";
    const result = validateIsStringGitHubPAT(testString);

    expect(result).toBeFalsy();
  });
});