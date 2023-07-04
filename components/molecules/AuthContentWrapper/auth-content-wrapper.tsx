import React from "react";
import clsx from "clsx";

interface AuthContentWrapperProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ isAuthenticated, children }) => {
  return (
    <div className="relative">
      {!isAuthenticated && (
        <div className="absolute z-10 w-full h-full top-0 left-0 flex items-center justify-center">
          <h1 className="text-2xl z-1">
            Login Required
          </h1>
        </div>
      )}
      <div className={clsx(
        "relative",
        !isAuthenticated && "blur",
      )}>
        {children}
      </div>
    </div>
  );
};

export default AuthContentWrapper;
