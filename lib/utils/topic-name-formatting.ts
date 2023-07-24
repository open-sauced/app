import uppercaseFirst from "./uppercase-first";

/** Checks the input and if it should be camelcased, it will camelcase it. Uppercases the output. */
const topicNameFormatting = (name: string) => {
  if (!name) return "";

  if (name.toLowerCase() == "javascript") return "JavaScript";
  if (name.toLowerCase() == "ai") return "AI";
  if (name.toLowerCase() == "ml") return "Machine Learning";
  if (name.toLowerCase() == "cpp") return "CPP (C++)";
  if (name.toLowerCase() == "csharp") return "CSharp (C#)";
  if (name.toLowerCase() == "php") return "PHP";
  if (name.toLowerCase() == "typescript") return "TypeScript";
  else return uppercaseFirst(name);
};

export default topicNameFormatting;
