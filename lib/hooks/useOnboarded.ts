import { useEffect } from "react";
import { useGlobalStateContext } from "context/global-state";
import useSupabaseAuth from "./useSupabaseAuth";

const useOnboarded = () => {
  const { sessionToken } = useSupabaseAuth();
  const { appState, setAppState } = useGlobalStateContext();

  async function loadData() {
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
    } catch (e) {
      // show an alert
    }
  }

  useEffect(() => {
    if (sessionToken) {
      loadData();
    }
  }, [sessionToken]);

  return { onboarded: appState?.onboarded };
};

export default useOnboarded;
