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
