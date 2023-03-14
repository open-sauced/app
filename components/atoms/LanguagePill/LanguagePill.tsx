import React from "react";
import Image, { StaticImageData } from "next/image";

import JavascriptIcon from "img/topic-thumbnails/javascript.svg";
import ReactIcon from "/img/topic-thumbnails/react.svg";
import PythonIcon from "/img/topic-thumbnails/python.svg";
import AIIcon from "/img/topic-thumbnails/ai.svg";
import MLIcon from "/img/topic-thumbnails/machine-learning.svg";
import RustIcon from "/img/topic-thumbnails/rust.svg";
import PhpIcon from "/img/topic-thumbnails/php.svg";
import CsharpIcon from "/img/topic-thumbnails/c-sharp.svg";
import CIcon from "/img/topic-thumbnails/c.svg";
import CppIcon from "/img/topic-thumbnails/c-plus.svg";
import TypeScriptIcon from "/img/topic-thumbnails/typescript.svg";
import RubyIcon from "/img/topic-thumbnails/ruby.svg";
import JavaIcon from "/img/topic-thumbnails/java.svg";
import GolangIcon from "/img/topic-thumbnails/golang.svg";
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
