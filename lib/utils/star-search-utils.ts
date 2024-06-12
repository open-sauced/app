export type ThreadHistoryItem = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  type: string;
  message: string;
  is_error: boolean;
  error: string | null;
  actor: string;
  mood: number;
  starsearch_thread_id: string;
};

export function getThreadStream(threadHistory: ThreadHistoryItem[], intervalInMillis = 250) {
  return new ReadableStream({
    start(controller) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < threadHistory.length) {
          controller.enqueue(`data: ${threadHistory[i].message}`);
          i++;
        } else {
          controller.close();
          clearInterval(timer);
        }
      }, intervalInMillis);
    },
  });
}
