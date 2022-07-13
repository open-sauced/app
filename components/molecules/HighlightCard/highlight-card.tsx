import React from "react";
import Image from "next/image";
import Text from "../../atoms/Typography/text";
import hashIcon from "../../../public/icons/hash.svg";
import orgIcon from "../../../public/icons/org.svg";
import personIcon from "../../../public/icons/person.svg";
import repoIcon from "../../../public/icons/repo.svg";
import cancelIcon from "../../../public/x-circle.svg";

interface HighlightCardProps {
    label?: string;
    color?: string;
    icon?: "topic" | "repo" | "org" | "contributor";
    metric?: "decreases" | "increases";
}

const icons = {
  topic: {
    src: hashIcon.src,
    alt: "Topic"
  },
  org: {
    src: orgIcon.src,
    alt: "Organization"
  },
  contributor: {
    src: personIcon.src,
    alt: "Contributor"
  },
  repo: {
    src: repoIcon.src,
    alt: "Repository"
  }
};

const HighlightCard: React.FC<HighlightCardProps> = ({ label, color, icon, metric }) => {
  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg h-32">
      {/* Top Information */}
      <div className="flex justify-space-between">
        {/* Label */}
        <div></div>

        {/* Last Updated Information */}
        <div></div>
      </div>

      {/* Main Information */}
      <div>
        {/* Main Number */}
        <div>
          {/* Percentage */}
          <div></div>
          
          {/* Label */}
          <div></div>
        </div>

        {/* Progress Bar */}
        <div></div>
      </div>
    </div>
  );
};

export default HighlightCard;