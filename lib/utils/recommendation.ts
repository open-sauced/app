import { interestsType } from "./getInterestOptions";


const recommendation: Record<interestsType, string[]> = {
  react: ["https://github.com/Skyscanner/backpack"],
  javascript: ["https://github.com/EddieHubCommunity/LinkFree"],
  python: ["https://github.com/randovania/randovania"],
  ml: ["https://github.com/mindsdb/mindsdb"],
  ai: ["https://github.com/LAION-AI/Open-Assistant"],
  rust: ["https://github.com/swc-project/swc"],
  ruby: ["https://github.com/rubocop/rubocop"],
  c: ["https://github.com/systemd/systemd"],
  cpp: ["https://github.com/redpanda-data/redpanda"],
  csharp: ["https://github.com/ScottPlot/ScottPlot"],
  php: ["https://github.com/laravel/framework"],
  java: ["https://github.com/thingsboard/thingsboard"],
  typescript: ["https://github.com/sequelize/sequelize"],
  golang: ["https://github.com/cli/cli"]
};

export default recommendation;
