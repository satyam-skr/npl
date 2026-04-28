"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient, magicLinkClient, usernameClient } from "better-auth/client/plugins";

const inferredBaseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL ?? process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: inferredBaseUrl,
  plugins: [adminClient(), usernameClient(), magicLinkClient(), emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
