import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStore from "lib/store";

interface PrivateWrapperProps {
  isPrivateRoute?: boolean;
  children: React.ReactNode
}

const PrivateWrapper = ({ isPrivateRoute = false, children }: PrivateWrapperProps) => {
  const user = useUser();
  const router = useRouter();
  
  
  useEffect(() => {
    if (router.asPath?.includes("login")) return;

    if (isPrivateRoute && !user) {
      router.replace("/javascript/dashboard/filter/recent");
    }
  }, [user, isLoading]);

  return <>{children}</>;
};

export default PrivateWrapper;
