import * as Switch from "@radix-ui/react-switch";

interface ToggleSwitchProps {
  name: string;
  checked: boolean;
  handleToggle: () => void;
}

const ToggleSwitch = ({ name, checked = false, handleToggle }: ToggleSwitchProps): JSX.Element => {
  return (
    <Switch.Root
      defaultChecked
      checked={checked}
      onClick={() => handleToggle()}
      id={name}
      className={`${
        checked && "!bg-light-orange-10"
      } w-7 h-4 relative rounded-2xl overflow-hidden bg-light-slate-8 data-[state=checked]:!bg-light-orange-10`}
    >
      <Switch.Thumb
        className={`${
          checked && "!translate-x-[14px]"
        } bg-white w-3 h-3 block rounded-2xl translate-x-[2px] data-[state=checked]:!translate-x-6 `}
      />
    </Switch.Root>
  );
};

export default ToggleSwitch;
