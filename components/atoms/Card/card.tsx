import React from "react";

interface CardProps {
  className?: string;
  heading?: JSX.Element | string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, heading }) => {
  return (
    <article
      className={`${className ? className : ""} block ${
        heading ? "" : "p-3"
      } bg-white border rounded-lg drop-shadow-md`}
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
