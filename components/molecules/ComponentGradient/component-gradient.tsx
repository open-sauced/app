import React from "react";

interface ComponentGradientProps  {
  children: React.ReactNode;
  css?: string;
};

const ComponentGradient = ({ children, css }: ComponentGradientProps) => {
  return (
    <div className="relative overflow-hidden flex justify-center  h-screen bg-gradient-to-b from-gradient-dark-one   to-gradient-dark-two ">
      <div className="absolute -bottom-56 blur-4xl w-96 h-96 self-end rounded-full   bg-gradient-radial  from-gradient-orange-one to-gradient-orange-two "></div>
      <section className={`${css}`}>{children}</section>
    </div>
  );
};

export default ComponentGradient;
