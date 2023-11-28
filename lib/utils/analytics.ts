import posthog from "posthog-js";

interface AnalyticEvent {
  title: string;
  property: string;
  value: string;
  userInfo: DbUser | undefined;
}

function initiateAnalytics() {
  // eslint-disable-next-line
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
}

/**
 * Captures an analytic event
 *
 * @param title - The title of the event
 * @param property - The property of the event
 * @param value - The value of the event
 * @param userInfo - The user info for the currently logged in user. Undefined if no user is logged in.
 *
 */
async function captureAnalytics({ title, property, value, userInfo }: AnalyticEvent) {
  const analyticsObject: Record<string, string> = {};

  analyticsObject[property] = value;

  // if a user is not logged in, Posthog will generate an anonymous ID
  if (userInfo) {
    let userProperties = {};

    const { company, coupon_code, is_open_sauced_member, is_onboarded, role, is_maintainer } = userInfo;

    // A pro user is anyone with a role of 50 or higher
    userProperties = {
      company,
      coupon_code,
      is_open_sauced_member,
      is_onboarded,
      // TODO: this will need to change when we integrate the Tier work
      is_pro_user: role >= 50,
      is_maintainer,
    };
    posthog.identify(`${userInfo.id}`, userProperties);
  }

  posthog.capture(title, analyticsObject);
}

export { initiateAnalytics, captureAnalytics };
