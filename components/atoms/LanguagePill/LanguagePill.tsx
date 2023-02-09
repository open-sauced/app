import React from "react";
import Image, { StaticImageData } from "next/image";

import JavascriptIcon from "img/icons/☕️.svg";
import ReactIcon from "/img/icons/⚛️.svg";
import PythonIcon from "/img/icons/🐍.svg";
import AIIcon from "/img/icons/🤖.svg";
import MLIcon from "/img/icons/🧠.svg";
import RustIcon from "/img/icons/🦀.svg";

interface LanguagePillProps {
  topic: "react" | "javascript" | "python" | "ML" | "AI" | "rust" | string;
  classNames?: string;
  onClick?: () => void;
}
const LanguagePill = ({ topic, classNames, onClick }: LanguagePillProps) => {
  const renderTopicIcon = (name: string) => {
    const iconMap: { [name: string]: StaticImageData } = {
      react: ReactIcon,
      rust: RustIcon,
      javascript: JavascriptIcon,
      AI: AIIcon,
      ML: MLIcon,
      python: PythonIcon
    };

    return iconMap[name] || "";
  };

  const checkCamelCase = (name: string) => {
    if(name == "javascript") return "javaScript";
    else return name;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-xs text-light-slate-11 rounded-[1.875rem] w-max flex items-center gap-1 py-2 px-4 bg-light-slate-6 ${
        classNames || ""
      }`}
    >
      <Image src={renderTopicIcon(topic)} alt={topic} />
      <span className="font-normal capitalize">{checkCamelCase(topic)}</span>
    </div>
  );
};

export default LanguagePill;
