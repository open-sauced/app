import clsx from "clsx";
import React from "react";

interface FabProps extends React.HTMLAttributes<HTMLButtonElement> {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClick?: () => void;
}
const Fab = ({ position, children, className }: FabProps) => {
  const getFabPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "bottom-20 right-4";
    }
  };
  return (
    <button type="button" className={clsx("fixed", getFabPositionStyles(), className)}>
      {children}
    </button>
  );
};

export default Fab;
