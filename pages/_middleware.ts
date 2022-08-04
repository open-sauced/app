/* 
  Solution to lower case url issue:
  YouTube: https://www.youtube.com/watch?v=_vSMITiXAik
  GitHub: https://github.com/barhoumikhaled/nextjs-route-lowercase/blob/main/pages/_middleware.page.ts
*/

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const requestURL = request.nextUrl.href.toLocaleLowerCase();
  if (request.nextUrl.href === requestURL)
    return NextResponse.next();
  return NextResponse.redirect(
    `${requestURL}`
  );
}