import { NextResponse } from "next/server";

export default function middleware(req) {
  const { token } = req.cookies;
  const { pathname, origin } = req.nextUrl;
  if (
    !token &&
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/register/worker" &&
    pathname !== "/register/recruiter" &&
    pathname !== "/" &&
    pathname !== "/home" &&
    pathname !== "/next2.svg" &&
    pathname !== "/next1.svg" &&
    pathname !== "/logo.png" &&
    pathname !== "/logo2.png"
  ) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
