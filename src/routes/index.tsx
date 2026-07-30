import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-4 pt-20 pb-16 sm:pt-28 sm:pb-20 max-w-4xl mx-auto text-center">
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-6">
          AI-Powered Marketing Analytics
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Your AI Marketing
          <br />
          <span className="text-brand-600">Analyst</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Upload your social media CSVs and chat with an AI that doesn&apos;t just
          report what happened — it explains <strong>why</strong> and recommends{" "}
          <strong>what to do next</strong>. Like having a junior marketing analyst
          on your team, available 24/7.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/upload"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            Try it free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            How it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="px-4 py-16 sm:py-20 bg-gray-50 border-y border-gray-100"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Not another dashboard
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload your CSV"
              description="Export your social media data from Instagram, TikTok, or any platform. Drag, drop, done."
            />
            <StepCard
              number="2"
              title="Ask questions"
              description="Chat naturally — 'Why did engagement drop?' 'What should I post next week?' — like talking to an analyst."
            />
            <StepCard
              number="3"
              title="Get answers with context"
              description="The AI explains the WHY behind the numbers and gives you actionable next steps, not just charts."
            />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 py-16 sm:py-20 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-8">
          <ValueProp
            title="Answers WHY, not just WHAT"
            description="Most tools show you a chart and make you figure out the rest. Social Metrics AI connects the dots: reach declined because you posted 40% fewer videos, and your audience favors short-form content."
          />
          <ValueProp
            title="Actionable recommendations"
            description="Every answer comes with clear next steps — what to post, when to post, and which content types to double down on. No more guessing."
          />
          <ValueProp
            title="Conversational, not complicated"
            description="No dashboards to learn, no filters to configure. Just ask questions in plain English and get thoughtful, data-backed answers."
          />
          <ValueProp
            title="Works with your existing data"
            description="Upload standard CSV exports from any social platform. We handle the column mapping so you don't have to format anything."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-20 bg-brand-600 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to understand your social data?
        </h2>
        <p className="text-brand-100 text-lg mb-8 max-w-md mx-auto">
          Upload a CSV and start asking questions. No sign-up, no credit card.
        </p>
        <a
          href="/upload"
          className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
        >
          Get started
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
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
