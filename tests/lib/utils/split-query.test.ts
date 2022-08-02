import splitQuery from "lib/utils/split-query";

describe("[lib] splitQuery()", () => {
  it("Should return an array of strings split by the character ','", () => {
    const testString = "Hello,You";
    const expected = ["Hello", "You"];
    const testResult = splitQuery(testString);
    expect(testResult).toEqual(expect.arrayContaining(expected));
  });
  
  it("Should return an array of only strings even if split variable is at the end of string", () => {
    const testString = "Hello,You,";
    const expected = ["Hello", "You"];
    const testResult = splitQuery(testString);
    expect(testResult).toEqual(expect.arrayContaining(expected));
  });

  it("Should return a maximum of five arrays", () => {
    const testString = "I,A,M,L,O,N,G,S,T,R,I,N,G";
    const expected = ["I", "A", "M", "L", "O"];
    const testResult = splitQuery(testString);
    expect(testResult).toEqual(expect.arrayContaining(expected));
  });
});