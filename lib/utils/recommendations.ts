import { interestsType } from "./getInterestOptions";

const recommendations: Record<interestsType, string[]> = {
  react: ["Skyscanner/backpack"],
  javascript: ["EddieHubCommunity/LinkFree"],
  python: ["randovania/randovania"],
  ml: ["mindsdb/mindsdb"],
  ai: ["LAION-AI/Open-Assistant"],
  rust: ["swc-project/swc"],
  ruby: ["rubocop/rubocop"],
  c: ["systemd/systemd"],
  cpp: ["redpanda-data/redpanda"],
  csharp: ["ScottPlot/ScottPlot"],
  php: ["laravel/framework"],
  java: ["thingsboard/thingsboard"],
  typescript: ["sequelize/sequelize"],
  golang: ["cli/cli"],
  vue: ["vuejs/vue"],
  kubernetes: ["kubernetes/kubernetes"],
};

export default recommendations;
