import { Root, Thumb } from "@radix-ui/react-switch";
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
      className={`cursor-pointer w-max py-2 px-4 bg-light-slate-6 text-xs rounded-3xl border ${
        checked ? "bg-light-orange-8" : ""
      }`}
    >
      <Thumb>
        <div className="flex items-center gap-1">
          {renderTopicIcon(topic)}
          <span className="font-normal capitalize">{topicNameFormatting(topic)}</span>
        </div>
      </Thumb>
    </Root>
  );
};
