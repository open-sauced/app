import React from "react";

interface ComponentGradientProps {
  children: React.ReactNode;
  css?: string;
}

const ComponentGradient = ({ children, css }: ComponentGradientProps) => {
  return (
    <div className="relative overflow-hidden flex justify-center bg-gradient-to-b h-screen from-gradient-dark-one to-gradient-dark-two">
      {/* orange gradient overlay */}
      <div className="text-white  absolute blur-4xl -bottom-97  w-99 h-98 bg-gradient-radial from-gradient-orange-two to-gradient-orange-one  rounded-full"></div>
      <section>{children}</section>
    </div>
  );
};

export default ComponentGradient;
