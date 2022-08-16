import React from "react";
import { Select as SupbaseSelectComponent } from "@supabase/ui";

interface SelectOptionProps extends React.ComponentProps<typeof SupbaseSelectComponent.Option> {
  //Add additional prop definitions here
}

const SelectOption: React.FC<SelectOptionProps> = ( props ) => {
  return (
    <SupbaseSelectComponent.Option {...props}>
      {props.children}
    </SupbaseSelectComponent.Option>
  );
};

export default SelectOption;