import uppercaseFirst from "lib/utils/uppercase-first";

describe("[lib] uppercaseFirst()", () => {

  it("Should uppercase the first letter of a string", () => {
    const testString = "chad";
    const result = uppercaseFirst(testString);

    expect(result).toEqual("Chad");
  });
});
