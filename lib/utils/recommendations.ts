import { InterestType } from "./getInterestOptions";

const recommendations: Record<InterestType, string[]> = {
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
  angular: ["angular/angular"],
  golang: ["cli/cli"],
  vue: ["vuejs/vue"],
  kubernetes: ["kubernetes/kubernetes"],
  clojure: ["clojure/clojurescript"],
  svelte: ["sveltejs/svelte"],
  android: ["android/architecture-samples"],
  kotlin: ["Kotlin/kotlinx.coroutines"],
  swift: ["apple/swift"],
};

export default recommendations;
