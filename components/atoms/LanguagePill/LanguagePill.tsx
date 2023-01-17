import React from "react";
import JavascriptIcon from "img/icons/☕️.svg";
import ReactIcon from "/img/icons/⚛️.svg";
import PythonIcon from "/img/icons/🐍.svg";
import AIIcon from "/img/icons/🤖.svg";
import MLIcon from "/img/icons/🧠.svg";
import RustIcon from "/img/icons/🦀.svg";
import Image from "next/legacy/image";

interface LanguagePillProps {
  topic: "react" | "javascript" | "python" | "ML" | "AI" | "rust" | string;
  classNames?: string;
  onClick?: () => void;
}
const LanguagePill = ({ topic, classNames, onClick }: LanguagePillProps) => {
  const renderTopicIcon = (name: string) => {
    return name === "javascript"
      ? JavascriptIcon
      : name === "rust"
        ? RustIcon
        : name === "python"
          ? PythonIcon
          : name === "AI"
            ? AIIcon
            : name === "ML"
              ? MLIcon
              : name === "react"
                ? ReactIcon
                : "";
  };
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-xs text-light-slate-11 rounded-[1.875rem] w-max flex items-center gap-1 py-2 px-4 bg-light-slate-6 ${
        classNames || ""
      }`}
    >
      <Image src={renderTopicIcon(topic)} alt={topic} />
      <span className="font-normal capitalize">{topic}</span>
    </div>
  );
};

export default LanguagePill;
