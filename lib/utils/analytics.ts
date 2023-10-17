import posthog from "posthog-js";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

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

  return {
    captureAnalytics({ title, property, value }: AnalyticEvent) {
      const analyticsObject: Record<string, string> = {};

      analyticsObject[property] = value;

      // if a user is not logged in, Posthog will generate an anonymous ID
      if (user) {
        posthog.identify(user.user_metadata.sub);
      }

      posthog.capture(title, analyticsObject);
    },
  };
}

export { initiateAnalytics, useAnalytics };
