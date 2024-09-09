import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface RemainingReposTooltipProps {
  content: ReactNode;
  trigger: ReactNode;
}

const RemainingReposTooltip = ({ content, trigger }: RemainingReposTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
        <Tooltip.Content className="bg-white text-gray-900 p-2 rounded-md shadow-lg max-w-xs border border-gray-200">
          {content}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default RemainingReposTooltip;
