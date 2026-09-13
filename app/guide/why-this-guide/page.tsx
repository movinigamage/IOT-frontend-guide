import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GuideCard, NextUp, QuickGlance } from '@/components/guide/GuideBlocks';

export default function WhyThisGuidePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Why This Toolkit Exists</h1>
        <p className="text-lg text-muted-foreground">
          A short explanation of how this toolkit helps new IoT frontend contributors learn, build, integrate, and troubleshoot.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="This toolkit has two parts: general frontend guidance, and IoT project-specific guidance."
          issue="Read this first if you are brand new here and not sure where to start."
          fix="Start with the general Frontend Development Guide, then move into the IoT Project Guide."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Purpose</h2>
          <p className="text-muted-foreground leading-relaxed">
            This toolkit helps contributors move from general frontend understanding to practical IoT project work. It explains concepts, shows examples, and guides the next action instead of leaving readers with raw technical notes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Toolkit Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Frontend Development Guide">
              <p>General frontend workflow, UI/UX, component planning, API testing, quality checks, and learning resources.</p>
            </GuideCard>
            <GuideCard title="IoT Project Guide">
              <p>The current frontend, Data API examples, frontend-backend integration, mock-to-live migration, and issue reporting.</p>
            </GuideCard>
          </div>
        </section>

        <NextUp title="Start Here">
          <p>Begin with the general frontend development guide, then move into the IoT project guide when you are ready to apply the ideas.</p>
          <Link href="/guide/frontend-workflow" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Open Frontend Best Practices <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
