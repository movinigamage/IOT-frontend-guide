import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CheckList, GuideCard } from '@/components/guide/GuideBlocks';

export default function CodeQualityPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Code Quality Companion</h1>
        <p className="text-lg text-muted-foreground">
          A compatibility page for previous Code Quality links. The main combined guidance now lives under Component Planning and Code Quality.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">High-Value Code Quality Checks</h2>
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <CheckList
              items={[
                'Keep API calls out of presentational components.',
                'Normalize backend responses before components consume them.',
                'Remove unnecessary console logs after debugging.',
                'Avoid hard-coded live data, dataset IDs, endpoint URLs, and auth flags in production paths.',
                'Keep local analytics clearly separate from backend analytics.',
                'Add focused tests for utilities, adapters, and hooks when the project test setup supports it.',
              ]}
            />
          </div>
        </section>

        <section>
          <GuideCard title="Primary guide">
            <p>
              Use the combined page for the current toolkit structure. It covers component responsibility, hooks, services, adapters, hard-coded data, and IoT-specific maintainability concerns.
            </p>
            <Link href="/guide/component-planning" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mt-3">
              Open Component and Code Quality <ArrowRight className="w-4 h-4" />
            </Link>
          </GuideCard>
        </section>
      </div>
    </article>
  );
}
