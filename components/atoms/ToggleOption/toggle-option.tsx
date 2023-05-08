import ToggleSwitch from "../ToggleSwitch/toggle-switch";
import { HiInformationCircle } from "react-icons/hi";
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
      className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-0.5 border border-light-slate-6 bg-light-slate-1 dark:border-dark-slate-8 dark:bg-dark-slate-3"
    >
      <ToggleSwitch size="sm" handleToggle={handleToggle} name={optionText} checked={checked} />
      <span className="text-sm text-light-slate-11 dark:text-dark-slate-12">{optionText}</span>
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
