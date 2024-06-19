import Tooltip from "components/atoms/Tooltip/tooltip";
import { StarSearchLogo } from "./StarSearchLogo";
import { useLocalStorage } from "react-use";

interface StarSearchButtonProps {
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StarSearchButton = ({ onOpen }: StarSearchButtonProps) => {
  const [tooltipOpen, setTooltipOpen] = useLocalStorage("show-star-search-button-tooltip", true);

  return (
    <Tooltip
      direction="top"
      defaultOpen={tooltipOpen}
      className="text-center w-36"
      content="Ask StarSearch about your Workspace"
    >
      <button onClick={onOpen} onMouseEnter={() => setTooltipOpen(false)}>
        <StarSearchLogo />
      </button>
    </Tooltip>
  );
};
