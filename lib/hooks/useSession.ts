import { useEffect, useState } from "react";
import useStore from "lib/store";

import useSupabaseAuth from "./useSupabaseAuth";

const useSession = () => {
  const { sessionToken } = useSupabaseAuth();
  const store = useStore();
  const [hasReports, setHasReports] = useState<boolean | undefined>(undefined);

  async function loadSession() {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });

      const data = await resp.json();

      store.setSession({ onboarded: data.is_onboarded, waitlisted: data.is_waitlisted });

      setHasReports(data.insights_role >= 50);
    } catch (e) {
      // show an alert
    }
  }

  useEffect(() => {
    if (sessionToken) {
      loadSession();
    }
  }, [sessionToken]);

  return { onboarded: store?.onboarded, waitlisted: store?.waitlisted, hasReports };
};

export default useSession;
