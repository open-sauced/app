import React from "react";
import clsx from "clsx";

import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";

import GitHubIcon from "img/icons/github-icon.svg";

interface AuthContentWrapperProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ isAuthenticated, children }) => {
  return (
    <div className="relative">
      {!isAuthenticated && (
        <div className="absolute z-10 w-full h-full top-0 left-0 flex items-center justify-center">
          <Button variant="primary" className="z-1 items-center px-2.5 py-1">
            <Icon IconImage={GitHubIcon} className="mr-2" /> Connect with GitHub
          </Button>
        </div>
      )}
      <div className={clsx(
        "relative",
        !isAuthenticated && "blur-sm",
      )}>
        {children}
      </div>
    </div>
  );
};

export default AuthContentWrapper;
