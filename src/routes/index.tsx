import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const EXAMPLE_QUESTIONS = [
  "What performed best this month?",
  "Why did engagement drop?",
  "What should I post next week?",
  "Which content format gets the most reach?",
  "When is the best time to post?",
];

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-4xl mx-auto text-center">
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-6">
          AI-Powered Marketing Analytics
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          A marketing analyst
          <br />
          <span className="text-brand-600">you can talk to</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Most analytics tools show you dashboards and make you figure out the rest.
          Social Metrics AI{" "}
          <strong className="text-gray-900">explains WHY</strong> your metrics
          changed and{" "}
          <strong className="text-gray-900">recommends WHAT to do next</strong> — in
          plain English. Like having a junior marketing analyst on your team,
          available 24/7.
        </p>

        {/* Example questions */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {EXAMPLE_QUESTIONS.map((q) => (
            <span
              key={q}
              className="inline-block rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-600 select-none"
            >
              {q}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/upload"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            Upload your first CSV — it's free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          No sign-up. No credit card. Just upload and start asking questions.
        </p>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="px-4 py-16 sm:py-20 bg-gray-50 border-y border-gray-100"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Upload → Ask → Get Answers
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload your CSV"
              description="Export your social media data from Instagram, TikTok, or any platform. Drag, drop, done — we handle the column mapping."
            />
            <StepCard
              number="2"
              title="Ask questions in plain English"
              description="Chat naturally: 'Why did reach drop?' 'What should I post next month?' No dashboards to learn, no filters to configure."
            />
            <StepCard
              number="3"
              title="Get answers you can act on"
              description="The AI doesn't just report numbers — it explains the WHY behind every trend and gives you clear recommendations for what to do next."
            />
          </div>
        </div>
      </section>

      {/* Example insight */}
      <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Answers that go beyond the numbers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Here's the kind of insight you'll get — not just a chart, but a
            diagnosis and a plan.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">
              You asked: <span className="text-gray-700">"Why did my reach drop this month?"</span>
            </span>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-sm leading-relaxed text-gray-700">
            <p className="mb-3">
              <strong className="text-gray-900">Reach declined because you posted 40% fewer videos than last month.</strong>{" "}
              Employee spotlight posts had the highest engagement, while
              promotional graphics underperformed.
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-900">Recommendation:</strong> Next
              month, increase short-form video frequency and schedule one employee
              feature each week to improve overall engagement. Your audience
              responds best to authentic, people-first content — lean into that.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 py-16 sm:py-20 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-8">
          <ValueProp
            icon={QuestionIcon}
            title="Answers WHY, not just WHAT"
            description="Most tools show you a chart and make you figure out the rest. Social Metrics AI connects the dots: reach declined because you posted 40% fewer videos, and your audience favors short-form content."
          />
          <ValueProp
            icon={TargetIcon}
            title="Actionable recommendations"
            description="Every answer comes with clear next steps — what to post, when to post, and which content types to double down on. No more guessing."
          />
          <ValueProp
            icon={ChatIcon}
            title="Conversational, not complicated"
            description="No dashboards to learn, no filters to configure. Just ask questions in plain English and get thoughtful, data-backed answers in seconds."
          />
          <ValueProp
            icon={UploadIcon}
            title="Works with your existing data"
            description="Upload standard CSV exports from any social platform. We handle the column mapping so you don't have to format or clean anything."
          />
        </div>
      </section>

      {/* Social proof */}
      <section className="px-4 py-16 sm:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">
            Trusted by marketing teams
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-2xl mx-auto">
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "Social Metrics AI saves me hours every week. Instead of staring at
              spreadsheets, I just ask it questions and get straight to the insights
              I need. It's like having an extra analyst on the team."
            </blockquote>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                SM
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Sarah Mitchell
                </p>
                <p className="text-sm text-gray-500">
                  Social Media Manager, 50K+ followers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-20 bg-brand-600 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to stop guessing and start knowing?
        </h2>
        <p className="text-brand-100 text-lg mb-8 max-w-md mx-auto">
          Upload a CSV and ask your first question in under 60 seconds. No sign-up
          required.
        </p>
        <a
          href="/upload"
          className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50 transition-colors shadow-sm"
        >
          Upload your first CSV
        </a>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        Social Metrics AI — Built with{" "}
        <a
          href="https://cto.new"
          className="underline hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          cto.new
        </a>
      </footer>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold text-sm mb-4">
        {number}
      </span>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ValueProp({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-brand-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1.5">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* Simple inline SVG icon components to avoid adding dependencies */

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
      />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  );
}
