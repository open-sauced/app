import * as Switch from "@radix-ui/react-switch";
import clsx from "clsx";

type ToggleSwitchProps = {
  name: string;
  checked: boolean;
  handleToggle: () => void;
  size?: "sm" | "lg" | "base";
  classNames?: string;
} & ({ ariaLabel: string; ariaLabelledBy?: never } | { ariaLabelledBy: string; ariaLabel?: never });

const ToggleSwitch = (props: ToggleSwitchProps): JSX.Element => {
  const { name, checked = false, handleToggle, size = "base", classNames } = props;
  let ariaProps: { "aria-label": string } | { "aria-labelledby": string } | undefined;

  if (props.ariaLabelledBy) {
    ariaProps = { "aria-labelledby": props.ariaLabelledBy };
  }

  if (props.ariaLabel) {
    ariaProps = { "aria-label": props.ariaLabel };
  }

  return (
    <Switch.Root
      defaultChecked
      checked={checked}
      onClick={() => handleToggle()}
      id={name}
      {...ariaProps}
      className={clsx(
        classNames ?? classNames,
        checked && "!bg-light-orange-10 justify-end",
        "flex rounded-2xl p-[2px] transition overflow-hidden bg-light-slate-8",
        size === "lg" ? "w-14 h-[30px]" : size === "base" ? "w-10 h-5" : size === "sm" ? "w-7 h-4" : ""
      )}
    >
      <Switch.Thumb className={clsx("bg-white block rounded-2xl  h-full w-1/2")} />
    </Switch.Root>
  );
};

export default ToggleSwitch;
