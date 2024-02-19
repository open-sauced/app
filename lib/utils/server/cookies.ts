import { GetServerSidePropsContext } from "next";

export function deleteCookie(res: GetServerSidePropsContext["res"], name: string) {
  res.setHeader("Set-Cookie", `${name}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure`);
}
