import { usePostHog } from "posthog-js/react";

interface StarSearchFeedbackAnalytic {
  feedback: "positive" | "negative";
  promptContent: string[];
  promptResponse: string[];
}

export const useStarSearchFeedback = () => {
  const posthog = usePostHog();

  const feedback = ({ feedback, promptContent, promptResponse }: StarSearchFeedbackAnalytic) => {
    posthog.capture("star_search_feedback", {
      feedback,
      promptContent,
      promptResponse,
    } as StarSearchFeedbackAnalytic);
  };

  return {
    feedback,
  };
};
