import posthog from "posthog-js";
import { usePostHog } from "next-use-posthog";

//Documentation on PostHog with Next.js: https://posthog.com/docs/integrate/third-party/next-js
function initiatePostHogForNextJs () {
  //eslint-disable-next-line
  usePostHog(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
}

function initiatePostHog () {
  //eslint-disable-next-line
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
}

function capturePostHogAnayltics (
  analyticsTitle: string,
  analyticsProperty: string,
  analyticsValue: string
) {
  const analyticsObject: Record<string, string> = {};

  analyticsObject[analyticsProperty] = analyticsValue;

  posthog.capture(analyticsTitle, analyticsObject);
}

export {
  initiatePostHogForNextJs,
  initiatePostHog,
  capturePostHogAnayltics
};