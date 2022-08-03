import React from "react";

interface CardProps {
    className?: string;
    children: JSX.Element;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <article className={`${className && className} block p-6 bg-white rounded-lg border border-slate-300`}>
      {children}
    </article>
  );
};

export default Card;