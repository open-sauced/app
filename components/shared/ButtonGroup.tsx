import { ButtonHTMLAttributes, DetailedHTMLProps, type ReactElement } from "react";

interface ButtonGroupProps {
  label: string;
  children: ReactElement<typeof ButtonGroupItem>[];
}

type ButtonGroupItemProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

// TODO: get the proper bg colors.
const variantStyles = {
  primary: "bg-light-slate-5",
  secondary: "bg-white",
} satisfies Record<Exclude<ButtonGroupItemProps["variant"], undefined>, string>;

export const ButtonGroupItem = ({ variant = "secondary", onClick, ...restOfProps }: ButtonGroupItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 px-2 border first:rounded-l first:border-r first:border-r-transparent last:rounded-r last:border-l-transparent ${variantStyles[variant]}`}
      {...restOfProps}
    />
  );
};

export const ButtonGroup = ({ children, label }: ButtonGroupProps) => {
  return (
    <div role="group" aria-label={label} className="flex items-center w-max">
      {children}
    </div>
  );
};
