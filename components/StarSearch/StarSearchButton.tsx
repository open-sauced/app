import { useLocalStorage } from "react-use";
import clsx from "clsx";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { StarSearchLogo } from "./StarSearchLogo";

interface StarSearchButtonProps {
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipText: string;
  enabled: boolean;
}

export const StarSearchButton = ({ onOpen, tooltipText, enabled }: StarSearchButtonProps) => {
  const [tooltipOpen, setTooltipOpen] = useLocalStorage("show-star-search-button-tooltip", true);

  return (
    <Tooltip
      direction="top"
      defaultOpen={tooltipOpen}
      className={clsx(!enabled && "grayscale", "text-center w-36")}
      content={tooltipText}
    >
      <button onClick={onOpen} onMouseEnter={() => setTooltipOpen(false)} aria-disabled={!enabled}>
        <span className="sr-only">{tooltipText}</span>
        <StarSearchLogo grayscale={!enabled} />
      </button>
    </Tooltip>
  );
};
