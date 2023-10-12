import posthog from "posthog-js";

function initiateAnalytics() {
  // eslint-disable-next-line
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
}

function captureAnayltics({
  // userId,
  title,
  property,
  value,
}: {
  // userId: string;
  title: string;
  property: string;
  value: string;
}) {
  const analyticsObject: Record<string, string> = {};

  analyticsObject[property] = value;
  posthog.identify();
  posthog.capture(title, analyticsObject);
}

export { initiateAnalytics, captureAnayltics };
