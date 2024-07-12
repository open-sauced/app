import Image from "next/image";
import { DiClojure } from "react-icons/di";
import {
  TbBrandAndroid,
  TbBrandAngular,
  TbBrandCSharp,
  TbBrandCpp,
  TbBrandGolang,
  TbBrandJavascript,
  TbBrandKotlin,
  TbBrandPhp,
  TbBrandPython,
  TbBrandReact,
  TbBrandRust,
  TbBrandSketch,
  TbBrandSvelte,
  TbBrandSwift,
  TbBrandTypescript,
  TbBrandVue,
  TbCode,
  TbCoffee,
  TbLetterC,
  TbRobot,
  TbVectorTriangle,
} from "react-icons/tb";
import KubernetesIcon from "img/icons/interests/kubernetes.svg";

export function getLanguageTopic(language: string) {
  switch (language) {
    case "go":
      return "golang";

    case "c++":
      return "cpp";

    case "c#":
      return "csharp";

    default:
      return language.toLowerCase();
  }
}

export function renderLanguageIcon(language: string) {
  switch (language) {
    case "go":
    case "golang":
      return <TbBrandGolang />;

    case "c++":
    case "cpp":
      return <TbBrandCpp />;

    case "c#":
    case "csharp":
      return <TbBrandCSharp />;

    case "react":
      return <TbBrandReact />;

    case "rust":
      return <TbBrandRust />;

    case "javascript":
      return <TbBrandJavascript />;

    case "ml":
      return <TbVectorTriangle />;

    case "ai":
      return <TbRobot />;

    case "python":
      return <TbBrandPython />;

    case "svelte":
      return <TbBrandSvelte />;

    case "typescript":
      return <TbBrandTypescript />;

    case "angular":
      return <TbBrandAngular />;

    case "php":
      return <TbBrandPhp />;

    case "c":
      return <TbLetterC />;

    case "ruby":
      return <TbBrandSketch />;

    case "java":
      return <TbCoffee />;

    case "vue":
      return <TbBrandVue />;

    case "kubernetes":
      return <Image src={KubernetesIcon} alt="Kubernetes" />;

    case "clojure":
      return <DiClojure />;

    case "kotlin":
      return <TbBrandKotlin />;

    case "android":
      return <TbBrandAndroid />;

    case "swift":
      return <TbBrandSwift />;

    default:
      return <TbCode />;
  }
}

export default function LanguagePill({ language, className }: { language: string; className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 px-4 py-2 text-xs rounded-3xl w-max bg-light-slate-3 text-light-slate-11 ${className}`}
    >
      <div className="text-sm text-black">{renderLanguageIcon(language)}</div>
      <span className="font-normal capitalize">{language}</span>
    </div>
  );
}
