import posthog from "posthog-js";

interface AnalyticEvent {
  title: string;
  property: string;
  value: string;
  identifier: string;
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
 * @param {string} identifier - The unique identifier for entity associated to the analytic event, typically a user id
 */
function captureAnayltics({ title, property, value, identifier }: AnalyticEvent) {
  const analyticsObject: Record<string, string> = {};

  analyticsObject[property] = value;
  posthog.identify(identifier);
  posthog.capture(title, analyticsObject);
}

export { initiateAnalytics, captureAnayltics };
