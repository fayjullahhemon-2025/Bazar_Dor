import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const pathname = request.nextUrl.pathname;
    const isAuthRoute =
        pathname === "/sign-in" ||
        pathname.startsWith("/sign-in/") ||
        pathname === "/sign-up" ||
        pathname.startsWith("/sign-up/");

    // If user is logged in, they cannot access sign-in or sign-up; redirect to homepage
    if (session && isAuthRoute) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("already_logged_in", "true");
        homeUrl.searchParams.set("t", Date.now().toString());
        return NextResponse.redirect(homeUrl);
    }

    // If user is not logged in, protected routes redirect to sign-in
    if (!session && !isAuthRoute) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("redirected", "true");
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        signInUrl.searchParams.set("t", Date.now().toString());
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/product/:path*",
        "/profile",
        "/sign-in",
        "/sign-in/:path*",
        "/sign-up",
        "/sign-up/:path*",
    ],
};