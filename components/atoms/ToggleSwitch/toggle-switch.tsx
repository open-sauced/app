import * as Switch from "@radix-ui/react-switch";
import clsx from "clsx";

interface ToggleSwitchProps {
  name: string;
  checked: boolean;
  handleToggle: () => void;
  size?: "sm" | "lg" | "base";
  classNames?: string;
}

const ToggleSwitch = ({
  name,
  checked = false,
  handleToggle,
  size = "base",
  classNames
}: ToggleSwitchProps): JSX.Element => {
  return (
    <Switch.Root
      defaultChecked
      checked={checked}
      onClick={() => handleToggle()}
      id={name}
      className={clsx(
        classNames ?? classNames,
        checked && "!bg-light-orange-10 justify-end",
        "flex rounded-2xl p-[2px] transition overflow-hidden w-11 h-6 bg-light-slate-8",
        size === "sm" ? "w-7 h-4" : size === "lg" ? "w-14 h-[30px]" : ""
      )}
    >
      <Switch.Thumb className={clsx("bg-white block rounded-2xl  h-full w-1/2")} />
    </Switch.Root>
  );
};

export default ToggleSwitch;
