import { Root, Thumb } from "@radix-ui/react-switch";
import Image from "next/image";
import { InterestType } from "lib/utils/getInterestOptions";
import topicNameFormatting from "lib/utils/topic-name-formatting";
import { renderTopicIcon } from "../LanguagePill/LanguagePill";

interface LanguageSwitchProps {
  topic: InterestType;
  checked: boolean;
  onClick: () => void;
}

export const LanguageSwitch = ({ topic, checked, onClick }: LanguageSwitchProps) => {
  return (
    <Root
      defaultChecked
      checked={checked}
      onClick={onClick}
      name={`language-pill-${topic}`}
      className={`cursor-pointer w-max py-2 px-4 bg-light-slate-6 text-xs rounded-3xl ${
        checked ? "bg-light-orange-10 text-white" : ""
      }`}
    >
      <Thumb>
        <div className="flex items-center gap-1">
          <Image src={renderTopicIcon(topic)} alt={topic} />
          <span className="font-normal capitalize">{topicNameFormatting(topic)}</span>
        </div>
      </Thumb>
    </Root>
  );
};
