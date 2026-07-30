import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/tanstack-start";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import { CLERK_ENABLED } from "~/lib/auth-client";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Social Metrics AI — Your AI Marketing Analyst",
      },
      {
        name: "description",
        content:
          "Upload your social media CSVs and chat with an AI that explains WHY things happened and WHAT to do next. Not another dashboard — a marketing analyst you can talk to.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        {CLERK_ENABLED ? (
          <ClerkLayout>{children}</ClerkLayout>
        ) : (
          <NoAuthLayout>{children}</NoAuthLayout>
        )}
      </body>
      <Scripts />
    </html>
  );
}

// ── Clerk-enabled layout ──────────────────────────────────────────

function ClerkLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkHeader />
      <main className="flex-1">{children}</main>
    </ClerkProvider>
  );
}

function ClerkHeader() {
  return (
    <header className="border-b border-gray-100 shrink-0">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="/"
          className="font-bold text-lg tracking-tight text-brand-700"
        >
          Social Metrics AI
        </a>
        <nav className="flex gap-4 items-center text-sm font-medium text-gray-600">
          <a href="/upload" className="hover:text-brand-600 transition-colors">
            Try it
          </a>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <a
              href="/sign-in"
              className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </a>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}

// ── Fallback layout (Clerk not configured) ────────────────────────

function NoAuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-100 shrink-0">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a
            href="/"
            className="font-bold text-lg tracking-tight text-brand-700"
          >
            Social Metrics AI
          </a>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/upload" className="hover:text-brand-600 transition-colors">
              Try it
            </a>
            <a
              href="/sign-in"
              className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  );
}
