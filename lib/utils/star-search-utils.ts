import { safeParse } from "valibot";
import { fetchApiData } from "helpers/fetchApiData";
import { UuidSchema } from "lib/validation-schemas";

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

export async function deleteWorkspaceStarSearchThread({
  workspaceId,
  threadId,
  bearerToken,
}: {
  workspaceId?: string;
  threadId: string;
  bearerToken: string;
}) {
  const validWorkspaceId = safeParse(UuidSchema, workspaceId);
  const validThreadId = safeParse(UuidSchema, threadId);

  if (!validWorkspaceId.success || !validThreadId.success) {
    return { error: new Error("Invalid workspace or thread ID") };
  }

  const { error } = await fetchApiData({
    path: `workspaces/${validWorkspaceId.output}/star-search/${validThreadId.output}`,
    method: "DELETE",
    bearerToken,
  });

  return { error };
}
