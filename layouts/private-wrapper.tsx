import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSession from "lib/hooks/useSession";

interface PrivateWrapperProps {
  isPrivateRoute?: boolean;
  children: React.ReactNode;
}

const PrivateWrapper = ({ isPrivateRoute = false, children }: PrivateWrapperProps) => {
  const user = useUser();
  const router = useRouter();
  const { isLoading } = useSessionContext();
  const { session: isValid } = useSession(true);

  async function checkSession() {
    if (router.asPath?.includes("login")) return;

    if (!isValid && !isLoading) {
      router.replace("/javascript/dashboard/filter/recent");
    }
  }

  useEffect(() => {
    if (isPrivateRoute && !user) {
      checkSession();
    }
  }, [user, isLoading]);

  return <>{children}</>;
};

export default PrivateWrapper;
