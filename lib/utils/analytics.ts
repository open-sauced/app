import posthog from "posthog-js";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";

interface AnalyticEvent {
  title: string;
  property: string;
  value: string;
}

function initiateAnalytics() {
  // eslint-disable-next-line
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
}

/**
 * Captures an analytic event
 *
 * @param {string} title - The title of the event
 * @param {string} property - The property of the event
 * @param {string} value - The value of the event
 */
function useAnalytics() {
  const { user } = useSupabaseAuth();
  const userInfo = useFetchUser(user?.user_metadata.user_name || "");

  return {
    captureAnalytics({ title, property, value }: AnalyticEvent) {
      const analyticsObject: Record<string, string> = {};

      analyticsObject[property] = value;

      // if a user is not logged in, Posthog will generate an anonymous ID
      if (user) {
        let userProperties = {};

        if (userInfo?.data) {
          const { company, coupon_code, is_open_sauced_member, is_onboarded, role } = userInfo?.data;

          // A pro user is anyone with a role of 50 or higher
          userProperties = { company, coupon_code, is_open_sauced_member, is_onboarded, is_pro_user: role >= 50 };
        }

        posthog.identify(user.user_metadata.sub, userProperties);
      }

      posthog.capture(title, analyticsObject);
    },
  };
}

export { initiateAnalytics, useAnalytics };
