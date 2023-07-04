import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";

import GitHubIcon from "img/icons/github-icon.svg";

import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

interface AuthContentWrapperProps {
  children: React.ReactNode;
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const { signIn, user: isAuthed } = useSupabaseAuth();

  const [host, setHost] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <div className="relative">
      {!isAuthed && (
        <div className="absolute z-10 w-full h-full top-0 left-0 flex items-center justify-center">
          <Button 
            variant="primary" 
            className="z-1 items-center px-2.5 py-1"
            onClick={() => {
              signIn({ provider: "github", options: { redirectTo: `${host}${currentPath}` } });
            }}
          >
            <Icon IconImage={GitHubIcon} className="mr-2" /> 
            Connect with GitHub
          </Button>
        </div>
      )}
      <div className={clsx(
        "relative",
        !isAuthed && "blur-sm",
      )}>
        {children}
      </div>
    </div>
  );
};

export default AuthContentWrapper;
