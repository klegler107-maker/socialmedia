// Shared client-side auth helpers for Social Metrics AI.
// Gracefully handles the case where Clerk is not yet configured.

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

/** Whether Clerk auth is configured and available. */
export const CLERK_ENABLED =
  typeof PUBLISHABLE_KEY === "string" &&
  PUBLISHABLE_KEY.length > 20 &&
  PUBLISHABLE_KEY.startsWith("pk_") &&
  !PUBLISHABLE_KEY.includes("REPLACE");
