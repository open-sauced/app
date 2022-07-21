import React from "react";
import { Button as SupabaseButtonComponent } from "@supabase/ui";

interface ButtonProps extends React.ComponentProps<typeof SupabaseButtonComponent> {
  //Add additional prop definitions here
}

const Button: React.FC<ButtonProps> = ( props ) => {

  const style = {
    primary: "!bg-orange-500 !border-orange-500 hover:!bg-orange-600",
    default: "!bg-slate-50 !border-slate-300 text-slate-800 hover:!bg-slate-100",
    outline: "!bg-orange-50 !border-orange-500 !text-orange-600 hover:!bg-orange-100",
    link: "!text-orange-600 hover:!bg-orange-100"
  };

  return (
    <SupabaseButtonComponent 
      className={
        `${props.className && props.className} !text-sm !font-semibold !tracking-tight !py-1 !px-3 !rounded-md !px- focus:!border-orange-500 focus:outline-none focus-visible:ring focus-visible:!ring-orange-200 ` +
        `${props.type === "primary" ? style.primary : ""}` +
        `${props.type === "default" ? style.default : ""}` +
        `${props.type === "outline" ? style.outline : ""}` +
        `${props.type === "link" ? style.link : ""}`
      }
      {...props}>
      {props.children}
    </SupabaseButtonComponent>
  );
};

export default Button;