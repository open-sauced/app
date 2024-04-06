export function validateListPath(path: string) {
  // ()
  const regex =
    /^lists\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/(contributors|stats\/(most-active-contributors|contributions-evolution-by-type|contributions-by-project))))\/??/;

  return regex.test(path);
}

export async function fetchApiData<T>({
  path,
  body,
  method = "GET",
  headers,
  bearerToken,
  pathValidator,
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: object;
  bearerToken: string;
  pathValidator?(path: string): boolean;
}) {
  const baseUrl = new URL(process.env.NEXT_PUBLIC_API_URL!);
  const apiUrl = new URL(`${baseUrl.pathname}/${path}`, baseUrl);
  const init: RequestInit = {
    method,
    headers: {
      ...headers,
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(apiUrl, init);

  if (response.ok) {
    if (method === "DELETE") {
      return { data: null, error: null };
    } else {
      return { data: (await response.json()) as T, error: null };
    }
  }

  const { status, statusText } = response;

  return { data: null, error: { status, statusText } };
}
