import { usePostHog } from "posthog-js/react";

export interface StarSearchFeedbackAnalytic {
  feedback: "positive" | "negative";
  promptContent: string[];
  promptResponse: string[];
}

export interface StarSearchPromptAnalytic {
  promptContent: string;
  promptResponse: string;
}

export const useStarSearchFeedback = () => {
  const posthog = usePostHog();

  const prompt = ({ promptContent, promptResponse }: StarSearchPromptAnalytic) => {
    posthog.capture("star_search_prompt", {
      promptContent,
      promptResponse,
    } satisfies StarSearchPromptAnalytic);
  };

  const feedback = ({ feedback, promptContent, promptResponse }: StarSearchFeedbackAnalytic) => {
    posthog.capture("star_search_feedback", {
      feedback,
      promptContent,
      promptResponse,
    } satisfies StarSearchFeedbackAnalytic);
  };

  return {
    feedback,
    prompt,
  };
};
