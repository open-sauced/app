export function validateListPath(path: string) {
  // ()
  const regex =
    /^lists\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/(contributors|stats\/(most-active-contributors|contributions-evolution-by-type))))\/??/;

  return regex.test(path);
}

export async function fetchApiData<T>({
  path,
  method = "GET",
  headers,
  bearerToken,
  pathValidator,
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  bearerToken: string;
  pathValidator(path: string): boolean;
}) {
  if (!pathValidator(path)) {
    return { data: null, error: { status: 400, statusText: "bad request" } };
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const response = await fetch(apiUrl, {
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
