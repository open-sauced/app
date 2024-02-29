import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  heading?: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, heading }) => {
  return (
    <article
      className={`${className ? className : ""} block ${
        heading ? "" : "p-3"
      } bg-background border rounded-lg shadow-xs`}
    >
      {heading ? (
        <>
          <div className="px-3 md:px-6 py-3 rounded-t-lg bg-light-slate-3 dark:bg-dark-slate-3">{heading}</div>
          <div>{children}</div>
        </>
      ) : (
        children
      )}
    </article>
  );
};

export default Card;
