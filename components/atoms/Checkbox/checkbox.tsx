import React, { HTMLAttributes } from "react";
import { Checkbox as SupbaseCheckboxComponent } from "@supabase/ui";

interface CheckboxProps extends React.ComponentProps<typeof SupbaseCheckboxComponent> {
  //Add additional prop definitions here
  title: string;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <SupbaseCheckboxComponent
      className={`checked:[&>*]:!bg-orange-500 disabled:[&>*]:!cursor-not-allowed !text-orange-500 ${
        props.className || ""
      }`}
      {...props}
    />
  );
};

export default Checkbox;
