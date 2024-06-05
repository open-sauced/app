import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  heading?: ReactNode;
  children: ReactNode;
  focusable?: boolean;
}

const Card = ({ className, children, heading, focusable = false }: CardProps) => {
  return (
    <article
      className={`${className ? className : ""} block ${heading ? "" : "p-3"} bg-white border rounded-lg shadow-xs`}
      tabIndex={focusable ? 0 : undefined}
    >
      {heading ? (
        <>
          <div className="px-3 py-3 rounded-t-lg md:px-6 bg-light-slate-3">{heading}</div>
          <div>{children}</div>
        </>
      ) : (
        children
      )}
    </article>
  );
};

export default Card;
