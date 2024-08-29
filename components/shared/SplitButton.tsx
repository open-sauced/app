import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import Button from "./Button/button";

type Action = { label: string; onClick: () => void; icon?: React.FC };
type NonEmptyArray<T> = [T, ...T[]];

type SplitButtonProps = {
  actions: NonEmptyArray<Action>;
  side?: "top" | "right" | "left" | "bottom";
  align?: "start" | "center" | "end";
  alignOffset?: number;
};

export const SplitButton = ({ actions, side, align, alignOffset }: SplitButtonProps) => {
  const [action, setAction] = useState<Action>(actions[0]);

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Button variant="primary" className="flex gap-2 rounded-r-none" onClick={action.onClick}>
        {action.icon && <action.icon />}
        {action.label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary" className="px-2 rounded-l-none !border-l-white">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={side} align={align} alignOffset={alignOffset}>
          {actions.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.label}
              onClick={() => {
                setAction(actionItem);
              }}
            >
              {actionItem.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
