import uppercaseFirst from "./uppercase-first";

/** Checks the input and if it should be camelcased, it will camelcase it. Uppercases the output. */
const checkCamelCaseNaming = (name: string) => {
    if(name.toLowerCase() == "javascript") return "JavaScript";
    else return uppercaseFirst(name);
}

export default checkCamelCaseNaming