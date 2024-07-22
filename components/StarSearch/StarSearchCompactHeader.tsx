import { ArrowLeftIcon, HistoryIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import { HiOutlineShare } from "react-icons/hi";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { StarSearchLogo } from "./StarSearchLogo";

type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface StarSearchCompactHeaderProps {
  onBack: OnClick;
  onShare?: OnClick;
  onNewChat: OnClick;
  onShowHistory: OnClick;
  onClose: OnClick;
}

export const StarSearchCompactHeader = ({
  onBack,
  onShare,
  onNewChat,
  onShowHistory,
  onClose,
}: StarSearchCompactHeaderProps) => {
  const buttonHoverStyle = "hover:text-orange-500";

  return (
    <div className="flex items-center justify-between gap-2 [&_button]:text-slate-600 h-9 p-1 bg-slate-50">
      <div className="flex items-center gap-2">
        <Tooltip direction="top" className="text-center w-36" content="Back">
          <button onClick={onBack} className={buttonHoverStyle}>
            <ArrowLeftIcon />
          </button>
        </Tooltip>
        <StarSearchLogo size="small" />
        <span className="font-semibold text-slate-800">StarSearch</span>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip direction="top" className="text-center w-36" content="New Chat">
          <button onClick={onNewChat} className={buttonHoverStyle}>
            <span className="sr-only">New Chat</span>
            <PlusIcon />
          </button>
        </Tooltip>
        {onShare ? (
          <Tooltip direction="top" className="text-center w-36" content="Share current conversation">
            <button onClick={onShare} className={buttonHoverStyle}>
              <span className="sr-only">Share current conversation</span>
              <HiOutlineShare />
            </button>
          </Tooltip>
        ) : null}
        <Tooltip direction="top" className="text-center w-36" content="Chat history">
          <button onClick={onShowHistory} className={buttonHoverStyle}>
            <span className="sr-only">Chat history</span>
            <HistoryIcon />
          </button>
        </Tooltip>
        {onClose ? (
          <Tooltip direction="top" className="text-center w-36" content="Close StarSearch">
            <button onClick={onClose} className="hover:text-orange-500">
              <span className="sr-only">Close StarSearch</span>
              <XIcon />
            </button>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};
