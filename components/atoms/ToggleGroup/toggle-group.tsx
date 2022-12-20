import * as GroupToggle from "@radix-ui/react-toggle-group";
import { useState } from "react";
import ToggleGroupItem from "../ToggleGroupItem/toggle-group-item";

interface ToggleGroupProps {
    children: React.ReactNode,
    /** Allows the user to deselect an option, resulting in none being selected. */
    allowNone?: boolean,
    /** Decides which option will be selected by default. Provide the position of the element to be selected starting from 0. */
    defaultSelection?: string | number,
    /** Callback function that is called when the user selects an option, and the position of the selected element is passed into as string, starting with '0'. */
    handleChange?: (value: string) => void
}

/** A ToggleGroup component that allows the user to select one option from a list of options.
 * Warning: Do NOT re-order the children after the component has been rendered.
 *
 * @example
 * <ToggleGroup>
 *      <>Option 1</> // React Fragment. Will use our styling
 *      <>Option <span>2</span></> // Can be a nested component
 *      <div>Option 3</div> // Any type of component can be used
 * </ToggleGroup>
 */
const ToggleGroup = ({
  children,
  allowNone = false,
  defaultSelection = "0",
  handleChange
}: ToggleGroupProps) => {
  const [value, setValue] = useState(defaultSelection+"");

  const handleValueChange = (value: string) => {
    if(value || allowNone) {
      setValue(value);
      handleChange && handleChange(value);
    }
  };

  if(!children) return null;

  return (
    <GroupToggle.Root type="single" value={value} onValueChange={handleValueChange} className="bg-light-slate-6 rounded-lg p-0.25">
      {
        Array.isArray(children) ? children.map((child, index) => (
          <ToggleGroupItem checked={value==`${index}`} value={`${index}`} key={index}>
            {child}
          </ToggleGroupItem>
        ))
          : <ToggleGroupItem checked={value=="0"} value={"0"}>
            {children}
          </ToggleGroupItem>
      }
    </GroupToggle.Root>
  );

};

export default ToggleGroup;
