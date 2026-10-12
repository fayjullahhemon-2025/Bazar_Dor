import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("redirected", "true");
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        signInUrl.searchParams.set("t", Date.now().toString());
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/product/:path*", "/profile"], // Specify the routes the middleware applies to
};