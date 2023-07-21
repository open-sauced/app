import { useUser } from "@supabase/auth-helpers-react";
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
  const { session } = useSession(true);

  async function checkSession() {
    if (router.asPath?.includes("login")) return;

    if (!session) {
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
