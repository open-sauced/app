import React from "react";
import Image, { StaticImageData } from "next/image";

import JavascriptIcon from "img/icons/👾.svg";
import ReactIcon from "/img/icons/⚛️.svg";
import PythonIcon from "/img/icons/🐍.svg";
import AIIcon from "/img/icons/🤖.svg";
import MLIcon from "/img/icons/🧠.svg";
import RustIcon from "/img/icons/🦀.svg";
import PhpIcon from "/img/icons/📄.svg";
import CsharpIcon from "/img/icons/🎹.svg";
import CIcon from "/img/icons/🥸.svg";
import CppIcon from "/img/icons/🤓.svg";
import TypeScriptIcon from "/img/icons/🔥.svg";
import RubyIcon from "/img/icons/🌹.svg";
import JavaIcon from "/img/icons/☕️.svg";
import GolangIcon from "/img/icons/⛳️.svg";
import topicNameFormatting from "lib/utils/topic-name-formatting";

interface LanguagePillProps {
  topic:
    | "react"
    | "javascript"
    | "python"
    | "ML"
    | "AI"
    | "rust"
    | "ruby"
    | "c"
    | "cpp"
    | "csharp"
    | "php"
    | "java"
    | "typescript"
    | "golang"
    | string;
  classNames?: string;
  onClick?: () => void;
}
const LanguagePill = ({ topic, classNames, onClick }: LanguagePillProps) => {
  const renderTopicIcon = (name: string) => {
    const iconMap: { [name: string]: StaticImageData } = {
      react: ReactIcon,
      rust: RustIcon,
      javascript: JavascriptIcon,
      ai: AIIcon,
      ml: MLIcon,
      python: PythonIcon,
      typescript: TypeScriptIcon,
      csharp: CsharpIcon,
      cpp: CppIcon,
      php: PhpIcon,
      c: CIcon,
      ruby: RubyIcon,
      java: JavaIcon,
      golang: GolangIcon
    };

    return iconMap[name] || "";
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-xs text-light-slate-11 rounded-[1.875rem] w-max flex items-center gap-1 py-2 px-4 bg-light-slate-6 ${
        classNames || ""
      }`}
    >
      <Image src={renderTopicIcon(topic)} alt={topic} />
      <span className="font-normal capitalize">{topicNameFormatting(topic)}</span>
    </div>
  );
};

export default LanguagePill;
