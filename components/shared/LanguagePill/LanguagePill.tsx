import Image, { StaticImageData } from "next/image";
import { FaCode } from "react-icons/fa6";
import SwiftIcon from "img/icons/interests/swift.svg";
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
import AngularIcon from "/img/icons/interests/angular-new.svg";
import RubyIcon from "/img/icons/interests/ruby.svg";
import JavaIcon from "/img/icons/interests/java.svg";
import GolangIcon from "img/icons/interests/golang.svg";
import VueIcon from "img/icons/interests/vuejs.svg";
import KubernetesIcon from "img/icons/interests/kubernetes.svg";
import CloJureIcon from "img/icons/interests/clojure.svg";
import KotlinIcon from "img/icons/interests/kotlin.svg";
import AndroidIcon from "img/icons/interests/android.svg";

import topicNameFormatting from "lib/utils/topic-name-formatting";
import { InterestType, interests } from "lib/utils/getInterestOptions";

export const renderTopicIcon = (name: string) => {
  const iconMap: Record<InterestType, StaticImageData> = {
    react: ReactIcon,
    rust: RustIcon,
    javascript: JavascriptIcon,
    ai: AIIcon,
    ml: MLIcon,
    python: PythonIcon,
    svelte: SvelteIcon,
    typescript: TypeScriptIcon,
    angular: AngularIcon,
    csharp: CsharpIcon,
    cpp: CppIcon,
    php: PhpIcon,
    c: CIcon,
    ruby: RubyIcon,
    java: JavaIcon,
    golang: GolangIcon,
    vue: VueIcon,
    kubernetes: KubernetesIcon,
    clojure: CloJureIcon,
    kotlin: KotlinIcon,
    android: AndroidIcon,
    swift: SwiftIcon,
  };

  if (!interests.find((language) => language === name.toLowerCase())) {
    return <FaCode />;
  }

  return <Image src={iconMap[name as InterestType]} alt="" />;
};

interface LanguagePillProps {
  topic: string;
  className?: string;
}

export const LanguagePill = ({ topic, className }: LanguagePillProps) => {
  return (
    <div className={`flex items-center gap-1 px-4 py-2 text-xs rounded-3xl w-max bg-light-slate-6 ${className}`}>
      {renderTopicIcon(topic)}
      <span className="font-normal capitalize">{topicNameFormatting(topic)}</span>
    </div>
  );
};
