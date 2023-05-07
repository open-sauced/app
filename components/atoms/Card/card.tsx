import React from "react";
import clsx from "clsx";

interface CardProps {
    className?: string;
    heading?: JSX.Element | string;
    children: JSX.Element;
}

const Card: React.FC<CardProps> = ({ className, children, heading }) => {
  return (
    <article className={clsx(
      "block bg-white border rounded-lg drop-shadow-md",
      heading ? "" : "p-3",
      "dark:bg-dark-slate-3 dark:border-dark-slate-8",
      className ? className : ""
    )}>
      {
        heading ?
          <>
            <div className="px-3 md:px-6 py-3 rounded-t-lg bg-light-slate-3">
              {heading}
            </div>
            <div>
              {children}
            </div>
          </>

          :

          children
      }
    </article>
  );
};

export default Card;
