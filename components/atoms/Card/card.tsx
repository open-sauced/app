import React from "react";

interface CardProps {
    className?: string;
    heading?: JSX.Element;
    children: JSX.Element;
}

const Card: React.FC<CardProps> = ({ className, children, heading }) => {
  return (
    <article className={`${className ? className : ""} block ${heading ? "" : "p-6"} bg-white rounded-lg border border-slate-300`}>
      {
        heading ?
          <>
            <div className="px-6 py-3 rounded-t-lg bg-light-slate-3">
              {heading}
            </div>
            <div className="p-6">
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