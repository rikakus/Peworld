import { NextResponse } from "next/server";

export default function middleware(req) {
  const { token } = req.cookies;
  const {pathname,origin} = req.nextUrl
  if(!token && pathname !== "/login" && pathname !== "/register" && pathname !== "/" && pathname !== "/next2.svg" && pathname !== "/next1.svg"){
      return NextResponse.redirect(`${origin}/login`)
  }
}
