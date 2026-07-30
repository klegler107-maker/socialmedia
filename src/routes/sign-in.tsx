import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-start";
import { CLERK_ENABLED } from "~/lib/auth-client";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  if (!CLERK_ENABLED) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Authentication not configured
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Clerk authentication keys are not set. Please add your{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              VITE_CLERK_PUBLISHABLE_KEY
            </code>{" "}
            and{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              CLERK_SECRET_KEY
            </code>{" "}
            to the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env</code>{" "}
            file and restart the server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your Social Metrics AI account
          </p>
        </div>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/upload"
          appearance={{
            elements: {
              card: "shadow-none border border-gray-200 rounded-xl",
              headerTitle: "text-lg font-semibold",
              headerSubtitle: "text-sm text-gray-500",
              formButtonPrimary:
                "bg-brand-600 hover:bg-brand-700 text-sm font-medium",
              footerActionLink:
                "text-brand-600 hover:text-brand-700 font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}
