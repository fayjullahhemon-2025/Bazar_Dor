import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** Base URL of the server: uses NEXT_PUBLIC_APP_URL or current browser origin, falling back to localhost */
  baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : undefined),
});

export const { signIn, signUp, useSession, signOut, updateUser } = authClient;