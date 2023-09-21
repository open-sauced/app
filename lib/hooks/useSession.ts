import { useEffect, useState } from "react";
import useStore from "lib/store";

import { getFeatureAccess } from "lib/utils/feature-access";
import useSupabaseAuth from "./useSupabaseAuth";

const useSession = (getSession = false) => {
  const { sessionToken } = useSupabaseAuth(getSession);
  const store = useStore();
  const hasReports = useStore((state) => state.hasReports);
  const onboarded = useStore((state) => state.onboarded);
  const waitlisted = useStore((state) => state.waitlisted);
  const [session, setSession] = useState<false | DbUser>(false);

  const loadSession = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return false;
    }
  };

  const setStoreData = (isOnboarded: boolean, isWaitlisted: boolean, insightsRole: number, hasReports: boolean) => {
    store.setSession({
      onboarded: isOnboarded,
      waitlisted: isWaitlisted,
      insightRepoLimit: insightsRole >= 50 ? 50 : 10,
    });

    store.setHasReports(hasReports || insightsRole >= 50);
  };

  useEffect(() => {
    (async () => {
      if (sessionToken && getSession) {
        const data = await loadSession();
        const { hasReports } = await getFeatureAccess();

        setSession(data);
        setStoreData(data.is_onboarded, data.is_waitlisted, data.insights_role, hasReports);
      }
    })();
  }, [sessionToken]);

  return {
    onboarded,
    waitlisted,
    hasReports,
    session,
  };
};

export default useSession;
