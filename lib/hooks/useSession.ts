import { useEffect, useState } from "react";
import { useGlobalStateContext } from "context/global-state";
import useSupabaseAuth from "./useSupabaseAuth";

const useSession = () => {
  const { sessionToken } = useSupabaseAuth();
  const { appState, setAppState } = useGlobalStateContext();
  const [ hasReports, setHasReports ] = useState<boolean | undefined>(undefined);

  async function loadSession() {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      });

      const data = await resp.json();

      setAppState((state) => ({
        ...state,
        onboarded: data.is_onboarded
      }));

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

  return { onboarded: appState?.onboarded, hasReports };
};

export default useSession;
