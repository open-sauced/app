import { ButtonHTMLAttributes, Children, DetailedHTMLProps, ReactNode, isValidElement } from "react";

interface ButtonGroupProps {
  label: string;
  children: ReactNode;
}

type ButtonGroupItemProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

// TODO: get the proper bg colors.
const variantStyles = {
  primary: "bg-light-slate-5",
  secondary: "bg-white",
} satisfies Record<Exclude<ButtonGroupItemProps["variant"], undefined>, string>;

export const ButtonGroupItem = ({ variant = "secondary", ...restOfProps }: ButtonGroupItemProps) => {
  return (
    <button
      className={`p-1 px-2 border first:rounded-l first:border-r first:border-r-transparent last:rounded-r last:border-l-transparent ${variantStyles[variant]}`}
      {...restOfProps}
    />
  );
};

export const ButtonGroup = ({ children, label }: ButtonGroupProps) => {
  const invalidChild = Children.toArray(children).some((child) => {
    return !isValidElement(child) || (isValidElement(child) && child.type !== ButtonGroupItem);
  });

  if (invalidChild) {
    throw new Error("ButtonGroup children must be ButtonGroupItems");
  }

  return (
    <div role="group" aria-label={label} className="flex items-center w-max">
      {children}
    </div>
  );
};
