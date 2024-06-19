import Tooltip from "components/atoms/Tooltip/tooltip";
import { StarSearchLogo } from "./StarSearchLogo";

interface StarSearchButtonProps {
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StarSearchButton = ({ onOpen }: StarSearchButtonProps) => {
  return (
    <Tooltip
      direction="top"
      defaultOpen={true}
      className="text-center w-36"
      content="Ask StarSearch about your Workspace"
    >
      <button onClick={onOpen}>
        <StarSearchLogo />
      </button>
    </Tooltip>
  );
};
