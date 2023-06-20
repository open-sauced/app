import React, { ForwardedRef } from "react";
import clsx from "clsx";

export interface ButtonsProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant: "primary" | "default" | "outline" | "link" | "text";
  loading?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLElement, ButtonsProps>(
  ({ className, children, loading, disabled, href, ...props }, ref) => {
    const styles = {
      primary: `bg-light-orange-9 text-light-orange-2 border-light-orange-9 hover:bg-light-orange-10 ${
        disabled ? "bg-light-orange-7 hover:bg-light-orange-7 border-none  pointer-events-none" : ""
      }`,
      default: `bg-white border-light-slate-8 text-light-slate-11 hover:bg-light-slate-2 ${
        disabled ? "bg-light-slate-4 text-light-slate-9 pointer-events-none" : ""
      }`,
      outline: `bg-orange-50 border-orange-500 text-orange-600 hover:bg-orange-100 ${
        disabled ? "bg-light-orange-3 pointer-events-none text-light-orange-7 border-light-orange-5" : ""
      }`,
      link: `text-orange-600 hover:bg-orange-100 border-none ${disabled ? "text-orange-400 pointer-events-none" : ""}`,
    };

    const rootClass = clsx(
      className,
      props.variant === "primary" && styles.primary,
      props.variant === "default" && styles.default,
      props.variant === "outline" && styles.outline,
      props.variant === "link" && styles.link,
      disabled && "bg-light-orange-7 hover:bg-light-orange-7 border-none pointer-events-none",
      "inline-flex text-sm font-semibold tracking-tight border py-2 px-4 rounded-md focus-visible:border-orange-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-200 whitespace-nowrap"
    );

    const content = loading ? (
      <div>
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-4 h-4 mr-3 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          ></path>
        </svg>
        Loading...
      </div>
    ) : (
      children
    );

    if (href) {
      return (
        <a className={rootClass} href={href} ref={ref as ForwardedRef<HTMLAnchorElement>} {...props}>
          {content}
        </a>
      );
    }

    return (
      <button className={rootClass} ref={ref as ForwardedRef<HTMLButtonElement>} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
