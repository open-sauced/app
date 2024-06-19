import { ArrowLeftIcon, HistoryIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import { HiOutlineShare } from "react-icons/hi";
import { StarSearchLogo } from "./StarSearchLogo";

type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface StarSearchCompactHeaderProps {
  onBack: OnClick;
  onShare: OnClick;
  onNewChat: OnClick;
  onShowHistory: OnClick;
  onClose: OnClick;
  view: "prompt" | "chat";
}

export const StarSearchCompactHeader = ({
  onBack,
  onShare,
  onNewChat,
  onShowHistory,
  onClose,
  view,
}: StarSearchCompactHeaderProps) => {
  const buttonHoverStyle = "hover:text-orange-500";

  return (
    <>
      {view === "chat" ? (
        <div className="flex items-center justify-between gap-2 [&_button]:text-slate-600 h-8 p-1">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className={buttonHoverStyle}>
              <ArrowLeftIcon />
            </button>
            <StarSearchLogo size="small" />
            <span className="font-semibold text-slate-800">StarSearch</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onNewChat} className={buttonHoverStyle}>
              <PlusIcon />
            </button>
            <button onClick={onShare} className={buttonHoverStyle}>
              <HiOutlineShare />
            </button>
            <button onClick={onShowHistory} className={buttonHoverStyle}>
              <HistoryIcon />
            </button>
            <button onClick={onClose} className={buttonHoverStyle}>
              <XIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2 [&_button]:text-slate-600 h-8 p-1">
          <button onClick={onClose} className={buttonHoverStyle}>
            <XIcon />
          </button>
        </div>
      )}
    </>
  );
};
