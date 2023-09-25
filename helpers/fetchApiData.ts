export async function fetchApiData<T>({
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
  path,
  method = "GET",
  headers,
  bearerToken,
}: {
  baseUrl?: string;
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  bearerToken: string;
}) {
  const response = await fetch(`${baseUrl}/${path}`, {
    method,
    headers: {
      ...headers,
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    return { data: (await response.json()) as T, error: null };
  }

  const { status, statusText } = response;

  return { data: null, error: { status, statusText } };
}
