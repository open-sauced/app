import React from "react";
import clsx from "clsx";
// import { Button as SupabaseButtonComponent } from "@supabase/ui";

// interface ButtonProps extends React.ComponentProps<typeof SupabaseButtonComponent> {
//   //Add additional prop definitions here
// }

export interface ButtonsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "default" | "outline" | "link" | "text";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonsProps>(({ className, children, ...props }, ref) => {
  const style = {
    primary: "bg-light-orange-9 text-light-orange-2 border-light-orange-9 hover:bg-light-orange-10",
    default: "bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100",
    outline: "bg-orange-50 border-orange-500 text-orange-600 hover:bg-orange-100",
    link: "text-orange-600 hover:bg-orange-100"
  };
  return (
    <button
      className={clsx(
        className,
        "text-sm font-semibold tracking-tight py-1 px-3 rounded-md focus-visible:border-orange-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-200",
        props.variant === "primary" && style.primary,
        props.variant === "default" && style.default,
        props.variant === "outline" && style.outline,
        props.variant === "link" && style.link
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

// const Button: React.FC<ButtonProps> = (props) => {
//   const style = {
//     primary: "bg-light-orange-9 text-light-orange-2 border-light-orange-9 hover:bg-light-orange-10",
//     default: "bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100",
//     outline: "bg-orange-50 border-orange-500 text-orange-600 hover:bg-orange-100",
//     link: "text-orange-600 hover:bg-orange-100"
//   };

//   return (
//     <SupabaseButtonComponent
//       {...props}
//       className={
//         `${
//           props.className && props.className
//         } text-sm font-semibold tracking-tight py-1 px-3 rounded-md focus-visible:border-orange-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-200 ` +
//         `${props.type === "primary" ? style.primary : ""}` +
//         `${props.type === "default" ? style.default : ""}` +
//         `${props.type === "outline" ? style.outline : ""}` +
//         `${props.type === "link" ? style.link : ""}`
//       }
//     >
//       {props.children}
//     </SupabaseButtonComponent>
//   );
// };

export default Button;
