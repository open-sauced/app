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
  const isLoading = useStore(state => state.isLoading);
  
  
  useEffect(() => {
    debugger;
    if (isLoading) return;

    if (isPrivateRoute && !user) {
      router.replace("/javascript/dashboard/filter/recent");
    }
  }, [user, isLoading]);

  return <>{children}</>;
};

export default PrivateWrapper;
