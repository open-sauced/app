import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";

import GitHubIcon from "img/icons/github-icon.svg";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

interface AuthContentWrapperProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ isAuthenticated, children }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const { signIn } = useSupabaseAuth();

  const [host, setHost] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <div className="relative">
      {!isAuthenticated && (
        <div className="absolute z-10 w-full h-full top-0 left-0 flex items-center justify-center">
          <Button 
            variant="primary" 
            className="z-1 items-center px-2.5 py-1"
            onClick={async () => {
              await signIn({ provider: "github", options: { redirectTo: `${host}/${currentPath}` } });
            }}
          >
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
