import { useUser } from "@supabase/auth-helpers-react";
import { authSession } from "lib/hooks/authSession";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStore from "lib/store";

interface PrivateWrapperProps {
  isPrivateRoute?: boolean;
  children: React.ReactNode;
}

const PrivateWrapper = ({ isPrivateRoute = false, children }: PrivateWrapperProps) => {
  const user = useUser();
  const router = useRouter();

  async function checkSession() {
    if (router.asPath?.includes("login")) return;

    const isValid = await authSession();

    if (!isValid) {
      router.replace("/javascript/dashboard/filter/recent");
    }
  }

  useEffect(() => {
    if (isPrivateRoute && !user) {
      checkSession();
    }
  }, [user]);

  return <>{children}</>;
};

export default PrivateWrapper;
