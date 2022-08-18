import React from "react";
import { Select as SupabaseSelectComponent } from "@supabase/ui";

interface SelectProps extends React.ComponentProps<typeof SupabaseSelectComponent> {
  //Add additional prop definitions here
}

const Select: React.FC<SelectProps> = ( props ) => {
  return (
    <SupabaseSelectComponent {...props}>
      {props.children}
    </SupabaseSelectComponent>
  );
};

export default Select;