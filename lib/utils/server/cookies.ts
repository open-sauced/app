import { GetServerSidePropsContext } from "next";

type Response = GetServerSidePropsContext["res"];
type SameSite = "Lax" | "Strict" | "None";

export function deleteCookie({
  response,
  name,
  sameSite = "Lax",
}: {
  response: Response;
  name: string;
  sameSite?: SameSite;
}) {
  setCookie({ response, name, value: "", maxAge: 0, sameSite });
}

export function setCookie({
  response,
  name,
  value,
  maxAge = 31536000,
  sameSite = "Lax",
}: {
  response: Response;
  name: string;
  value: string;
  maxAge?: number;
  sameSite?: SameSite;
}) {
  response.setHeader(
    "Set-Cookie",
    `${name}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}; Secure`
  );
}
