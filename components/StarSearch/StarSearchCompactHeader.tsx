import { ArrowLeftIcon, HistoryIcon, PlusIcon, XIcon } from "@primer/octicons-react";
import { HiOutlineShare } from "react-icons/hi";
import { StarSearchLogo } from "./StarSearchLogo";

type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface StarSearchCompactHeaderProps {
  onBack: OnClick;
  onShare?: OnClick;
  onNewChat: OnClick;
  onShowHistory: OnClick;
  onClose: OnClick;
}

const CloseButton = ({ onClick }: { onClick: OnClick }) => {
  return (
    <button onClick={onClick} className="hover:text-orange-500">
      <XIcon />
    </button>
  );
};

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
        {onShare ? (
          <button onClick={onShare} className={buttonHoverStyle}>
            <HiOutlineShare />
          </button>
        ) : null}
        <button onClick={onShowHistory} className={buttonHoverStyle}>
          <HistoryIcon />
        </button>
        {onClose ? <CloseButton onClick={onClose} /> : null}
      </div>
    </div>
  );
};
