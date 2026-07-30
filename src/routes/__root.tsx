import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

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
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Scripts />
      </body>
    </html>
  );
}
