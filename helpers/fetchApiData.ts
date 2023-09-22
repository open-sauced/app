import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export async function fetchApiData<T>({
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
  path,
  headers,
  context,
}: {
  baseUrl?: string;
  path: string;
  headers?: HeadersInit;
  context: GetServerSidePropsContext;
}) {
  const supabase = createPagesServerClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { data: null, error: { status: 401, statusText: "Unauthorized" } };
  }

  const response = await fetch(`${baseUrl}/${path}`, {
    headers: {
      ...headers,
      accept: "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  const data = response.ok ? ((await response.json()) as T) : null;
  const { status, statusText } = response;
  const error = response.ok ? null : { status, statusText };

  return { data, error };
}
