import posthog from "posthog-js";
import { supabase } from "./supabase";

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
async function captureAnalytics({ title, property, value }: AnalyticEvent) {
  const analyticsObject: Record<string, string> = {};
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  analyticsObject[property] = value;

  // if a user is not logged in, Posthog will generate an anonymous ID
  if (user) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    let data: DbUser | undefined;

    if (response.status === 200) {
      data = await response.json();
    }

    let userProperties = {};

    if (data) {
      const { company, coupon_code, is_open_sauced_member, is_onboarded, role } = data;

      // A pro user is anyone with a role of 50 or higher
      userProperties = { company, coupon_code, is_open_sauced_member, is_onboarded, is_pro_user: role >= 50 };
    }

    posthog.identify(user.id, userProperties);
  }

  posthog.capture(title, analyticsObject);
}

export { initiateAnalytics, captureAnalytics };
