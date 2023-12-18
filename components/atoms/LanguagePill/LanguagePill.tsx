import Image, { StaticImageData } from "next/image";

import SvelteIcon from "img/icons/interests/svelte.svg";
import JavascriptIcon from "img/icons/interests/javascript.svg";
import ReactIcon from "/img/icons/interests/react.svg";
import PythonIcon from "/img/icons/interests/python.svg";
import AIIcon from "/img/icons/interests/ai.svg";
import MLIcon from "/img/icons/interests/machine-learning.svg";
import RustIcon from "/img/icons/interests/rust.svg";
import PhpIcon from "/img/icons/interests/php.svg";
import CsharpIcon from "/img/icons/interests/c-sharp.svg";
import CIcon from "/img/icons/interests/c.svg";
import CppIcon from "/img/icons/interests/c-plus.svg";
import TypeScriptIcon from "/img/icons/interests/typescript.svg";
import RubyIcon from "/img/icons/interests/ruby.svg";
import JavaIcon from "/img/icons/interests/java.svg";
import GolangIcon from "img/icons/interests/golang.svg";
import VueIcon from "img/icons/interests/vuejs.svg";
import KubernetesIcon from "img/icons/interests/kubernetes.svg";
import HacktoberfestIcon from "img/icons/interests/hacktoberfest.svg";
import CloJureIcon from "img/icons/interests/clojure.svg";

import topicNameFormatting from "lib/utils/topic-name-formatting";
import { InterestType } from "lib/utils/getInterestOptions";

interface LanguagePillProps {
  topic: InterestType;
  classNames?: string;
  onClick?: () => void;
}

const LanguagePill = ({ topic, classNames, onClick }: LanguagePillProps) => {
  const renderTopicIcon = (name: InterestType) => {
    const iconMap: Record<InterestType, StaticImageData> = {
      react: ReactIcon,
      rust: RustIcon,
      javascript: JavascriptIcon,
      ai: AIIcon,
      ml: MLIcon,
      python: PythonIcon,
      svelte: SvelteIcon,
      typescript: TypeScriptIcon,
      csharp: CsharpIcon,
      cpp: CppIcon,
      php: PhpIcon,
      c: CIcon,
      ruby: RubyIcon,
      java: JavaIcon,
      golang: GolangIcon,
      vue: VueIcon,
      kubernetes: KubernetesIcon,
      hacktoberfest: HacktoberfestIcon,
      clojure: CloJureIcon,
    };

    return iconMap[name];
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-xs rounded-[1.875rem] w-max flex items-center gap-1 py-2 px-4 bg-light-slate-6 ${
        classNames || ""
      }`}
    >
      <Image src={renderTopicIcon(topic)} alt={topic} />
      <span className="font-normal capitalize">{topicNameFormatting(topic)}</span>
    </div>
  );
};

export default LanguagePill;
