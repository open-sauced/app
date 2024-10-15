import { HiInformationCircle } from "react-icons/hi";
import ToggleSwitch from "../ToggleSwitch/toggle-switch";
interface ToogleOptionProps {
  optionText: string;
  withIcon?: boolean;
  checked: boolean;
  handleToggle: () => void;
}
const ToggleOption = ({ optionText, withIcon, checked, handleToggle }: ToogleOptionProps): JSX.Element => {
  return (
    <div
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-0.5 border border-light-slate-6 bg-light-slate-1"
    >
      <ToggleSwitch ariaLabel={optionText} size="sm" handleToggle={handleToggle} name={optionText} checked={checked} />
      <span className="text-sm text-light-slate-11">{optionText}</span>
      {withIcon && (
        <HiInformationCircle
          title="An outside contributor is not a member the organization"
          className="text-light-slate-9"
        />
      )}
    </div>
  );
};
export default ToggleOption;
