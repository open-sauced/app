import * as GroupToggle from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import ToggleGroupItem from '../ToggleGroupItem/toggle-group-item';

/* Draft
    This component is supposed to allow as many number of options as demanded

    * There was 2 ways to implement this:
        - Either by forcing other developers to use the ToggleGroupItem components inside the ToggleGroup component
            - i.e. by returning an error if the children are not ToggleGroupItem components
            - this allows for less flexibility
            - developers may forget that they need to use the ToggleGroupItem component, which is less intuitive
            - didnt think about how I would implement the logic control for it. Probably much harder

        - Or by allowing any type of component to be passed as children, but wrapping those components in a ToggleGroupItem component manually
            - this allows for more flexibility, and more control over the children
            - developers now wont need to remember that they need to use the ToggleGroupItem component and can use anything, which is more intuitive
            - this is the implementation I went with

    * This implementation depends on the input children being static, or dynamic but without re-ordering the children
        - as it uses the index of the children as keys, due to the possible absense of other unique identifiers
        - possibly, a key prop could be added to children, but I am not sure if you can enforce that prop to be present with TypeScript
        - if enforcing a prop for input children is possible, then we could also enforce a value prop, instead of using their indices as values.
*/

interface ToggleGroupProps {
    children: React.ReactNode,
    /** Allows the user to deselect an option, resulting in none being selected. */
    allowNone?: boolean,
    /** Decides which option will be selected by default. Provide the position of the element to be selected starting from 0. */
    defaultSelection?: string | number,
    /** Callback function that is called when the user selects an option, and the position of the selected element is passed into as string, starting with '0'. */
    handleChange?: (value: string) => void
}

const ToggleGroup = ({
    children,
    allowNone = false,
    defaultSelection = '0',
    handleChange
}: ToggleGroupProps) => {
    const [value, setValue] = useState(defaultSelection+"")

    const handleValueChange = (value: string) => {
        if(value || allowNone) {
            setValue(value)
            handleChange && handleChange(value)
        }
    }

    if(!children) return null;

  return (
    <GroupToggle.Root type='single' value={value} onValueChange={handleValueChange} className="bg-light-slate-6 rounded-lg p-0.25">
        {
            Array.isArray(children) ? children.map((child, index) => (
                <ToggleGroupItem checked={value==`${index}`} value={`${index}`}>
                    {child}
                </ToggleGroupItem>
            ))
            : <ToggleGroupItem checked={value=='0'} value={'0'}>
                {children}
            </ToggleGroupItem>
        }
    </GroupToggle.Root>
  );

}

export default ToggleGroup;
