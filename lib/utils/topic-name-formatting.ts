import uppercaseFirst from "./uppercase-first";

/** Checks the input and if it should be camelcased, it will camelcase it. Uppercases the output. */
const topicNameFormatting = (name: string) => {
  if (!name) return "";

  if(name.toLowerCase() == "javascript") return "JavaScript";
  if(name.toLowerCase() == "ai") return "AI";
  if(name.toLowerCase() == "ml") return "Machine Learning";
  else return uppercaseFirst(name);
};

export default topicNameFormatting;
