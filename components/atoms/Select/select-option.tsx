import React from "react";
import { Select as SupabaseSelectComponent } from "@supabase/ui";

interface SelectOptionProps extends React.ComponentProps<typeof SupabaseSelectComponent.Option> {
  //Add additional prop definitions here
}

const SelectOption: React.FC<SelectOptionProps> = ( props ) => {
  return (
    <SupabaseSelectComponent.Option {...props}>
      {props.children}
    </SupabaseSelectComponent.Option>
  );
};

export default SelectOption;