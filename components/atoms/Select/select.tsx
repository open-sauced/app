import React from "react";
import { Select as SupbaseSelectComponent } from "@supabase/ui";

interface SelectProps extends React.ComponentProps<typeof SupbaseSelectComponent> {
  //Add additional prop definitions here
}

const Select: React.FC<SelectProps> = ( props ) => {
  return (
    <SupbaseSelectComponent {...props}>
      {props.children}
    </SupbaseSelectComponent>
  );
};

export default Select;