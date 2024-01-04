import { FiMaximize2 } from "react-icons/fi";

export type OnToggleResizeEventType = (checked: boolean) => void;

export const Resizer = ({ onToggleResize }: { onToggleResize: OnToggleResizeEventType }) => {
  return (
    <button
      role="switch"
      aria-checked="true"
      onClick={(event) => {
        const button = event.currentTarget;
        const checked = button.ariaChecked === "true";
        button.ariaChecked = checked ? "false" : "true";

        onToggleResize(checked);
      }}
      className="border rounded border-transparent absolute top-0 right-0 p-2"
    >
      <span className="sr-only">Toggle graph size</span>
      <FiMaximize2 className="w-4 h-4 hover:text-orange-500" />
    </button>
  );
};
