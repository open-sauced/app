import React from "react";
import { Button as SupabaseButtonComponent } from "@supabase/ui";

interface ButtonProps extends React.ComponentProps<typeof SupabaseButtonComponent> {
  //Add additional prop definitions here
}

const Button: React.FC<ButtonProps> = ( props ) => {

  return (
    <SupabaseButtonComponent 
      className={
        `${props.className && props.className} !text-sm !font-semibold !tracking-tight !py-1 !px-3 !rounded-md !px- focus:!border-orange-500 focus:outline-none focus-visible:ring focus-visible:!ring-orange-200 `
      }
      {...props}>
      {props.children}
    </SupabaseButtonComponent>
  );
};

export default Button;