import { useEffect } from "react";

import useStore from "lib/store";

import useSupabaseAuth from "./useSupabaseAuth";

const useSession = (getSession = false) => {
  const { sessionToken } = useSupabaseAuth(getSession);
  const store = useStore();
  const hasReports = useStore(state => state.hasReports);
  const onboarded = useStore(state => state.onboarded);
  const waitlisted = useStore(state => state.waitlisted);

  async function loadSession() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    });

    if (resp.ok) {
      const data = await resp.json();

      store.setSession({
        onboarded: data.is_onboarded,
        waitlisted: data.is_waitlisted,
        insightRepoLimit: data.insights_role >= 50 ? 50 : 10
      });

      store.setHasReports(data.insights_role >= 50);
    } else {
    // show an alert
    }
  }

  useEffect(() => {
    if (sessionToken && getSession) {
      loadSession();
    }
  }, [sessionToken]);

  return { onboarded, waitlisted, hasReports };
};

export default useSession;
