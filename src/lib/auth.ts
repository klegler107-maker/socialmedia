// Server-side auth helpers for Clerk integration in TanStack Start server functions.
// Uses @clerk/tanstack-start/server's getAuth + TanStack Start's getRequest.
import { getAuth } from "@clerk/tanstack-start/server";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Get the authenticated user's ID from the current request, or null if not signed in.
 * Call this inside a createServerFn handler.
 */
export async function getUserId(): Promise<string | null> {
  try {
    const request = getRequest();
    const auth = await getAuth(request);
    return auth.userId ?? null;
  } catch {
    return null;
  }
}

/**
 * Require authentication — returns the userId or throws.
 * Call this at the top of protected server functions.
 */
export async function requireUserId(): Promise<string> {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("Authentication required");
  }
  return userId;
}
