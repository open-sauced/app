import { getTopContributorLanguages } from "lib/utils/contributor-utils";

describe("contributor utilities", () => {
  describe("getTopContributorLanguages()", () => {
    it("should get the top two languages in alpabetical order", () => {
      const user = {
        languages: {
          javascript: 1,
          typescript: 2,
          python: 3,
          rust: 4,
          go: 5,
        },
        interests: "logo,c++,assembly",
      } as any as DbUser;

      expect(getTopContributorLanguages(user)).toEqual(["go", "javascript"]);
    });

    it("should get the top two languages in alpabetical order as the top two interests when there are no languages", () => {
      const user = {
        languages: {},
        interests: "logo,c++,assembly",
      } as any as DbUser;

      expect(getTopContributorLanguages(user)).toEqual(["assembly", "c++"]);
    });

    it("should get no languages when there are no languages or interests", () => {
      const user = {
        languages: {},
        interests: "",
      } as any as DbUser;

      expect(getTopContributorLanguages(user)).toEqual([]);
    });
  });
});
