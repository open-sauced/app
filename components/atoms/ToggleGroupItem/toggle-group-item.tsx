import * as GroupToggle from "@radix-ui/react-toggle-group";
import clsx from "clsx";

interface ToggleGroupItemProps {
    checked: boolean;
    value: string,
    children: React.ReactNode
}

const ToggleGroupItem = ({
  checked,
  value,
  children
}: ToggleGroupItemProps) => {

  return (
    <GroupToggle.Item value={value}
      className={clsx(
        "px-4 py-2 m-0.5 rounded-md font-semibold text-sm text-light-slate-11 dark:text-slate-300",
        checked && "bg-light-slate-1 text-light-slate-12 dark:bg-dark-slate-3 dark:text-dark-slate-12"
      )}
    >
      {children}
    </GroupToggle.Item>
  );
};

export default ToggleGroupItem
;
