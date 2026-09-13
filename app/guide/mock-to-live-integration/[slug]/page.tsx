import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BulletList, Callout, CheckList, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';
import { getMockToLiveGuide, mockToLiveGuides, type IntegrationCodeBlock } from '@/lib/mockToLiveGuides';

export function generateStaticParams() {
  return mockToLiveGuides.map((guide) => ({ slug: guide.slug }));
}

function combineSteps(
  existing: string[] | undefined,
  steps: string[]
): Array<string | { label: string; done: boolean }> {
  const existingSteps = (existing ?? []).map((item) => ({
    label: `${item} (no action needed, it's already in the code)`,
    done: true,
  }));
  return [...existingSteps, ...steps];
}

// For flows that describe something that already exists end-to-end (no mix of
// done vs. pending items), mark every step done without repeating the same
// "already in the code" text on each line -- the green tick carries it instead.
function markDone(steps: string[]): Array<{ label: string; done: boolean }> {
  return steps.map((label) => ({ label, done: true }));
}

function CodeBlocks({ blocks }: { blocks: IntegrationCodeBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <div key={block.file + block.status}>
          <div className="flex items-center justify-between gap-3 mb-1">
            <p className="font-mono text-sm text-foreground">{block.file}</p>
            <span
              className={
                block.status === 'exists'
                  ? 'text-xs font-bold uppercase tracking-wide text-emerald-500 whitespace-nowrap'
                  : 'text-xs font-bold uppercase tracking-wide text-blue-500 whitespace-nowrap'
              }
            >
              {block.status === 'exists' ? 'Already exists' : 'Doesn’t exist yet'}
            </span>
          </div>
          {block.steps && (
            <p className="text-xs font-semibold text-blue-400 mb-2">{block.steps} from above, in code:</p>
          )}
          <CodeBlock>{block.code}</CodeBlock>
          {block.note && <p className="text-muted-foreground leading-relaxed mt-2">{block.note}</p>}
        </div>
      ))}
    </div>
  );
}

function IntegrationLayerSection({
  status,
  service,
  serviceExisting,
  integrationCode,
}: {
  status: string;
  service: string[];
  serviceExisting?: string[];
  integrationCode: IntegrationCodeBlock[];
}) {
  const heading = status === 'Live' ? 'How the Frontend Integration Layer Works' : 'Prepare the Frontend Integration Layer';

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">8. {heading}</h2>
      <p className="text-sm font-semibold text-foreground mb-3">Steps:</p>
      <StepFlow steps={combineSteps(serviceExisting, service)} />
      <p className="text-sm font-semibold text-foreground mb-3 mt-6">In code:</p>
      <CodeBlocks blocks={integrationCode} />
    </section>
  );
}

function getStatusClass(status: string) {
  if (status === 'Ready / Transitional' || status === 'Live') {
    return 'text-emerald-500';
  }

  if (status === 'Live / Bug Found') {
    return 'text-red-500';
  }

  if (status === 'Prepare Now / Pending Backend') {
    return 'text-amber-500';
  }

  return 'text-foreground';
}

export default async function MockToLiveGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getMockToLiveGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-400 mb-2">Mock-to-Live Guide</p>
        <h1 className="text-4xl font-bold text-foreground mb-3">{guide.title}</h1>
        <p className="text-base text-foreground mb-4">
          <strong>Status:</strong> <span className={getStatusClass(guide.status)}>{guide.status}</span>
        </p>
        <p className="text-lg text-muted-foreground">{guide.description}</p>
      </div>

      <div className="mb-8">
        <QuickGlance
          state={guide.quickState}
          issue={guide.quickIssue}
          fix={guide.quickFix}
          issueTone={guide.quickIssueTone ?? 'warning'}
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <GuideCard title="1. Goal">
          <p>{guide.goal}</p>
        </GuideCard>

        {guide.splitLabel && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">{guide.splitLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.canPrepare && (
                <GuideCard title="Can Prepare Now">
                  <CheckList items={guide.canPrepare} />
                </GuideCard>
              )}
              {guide.completeWhenAvailable && (
                <GuideCard title="Complete When Backend Is Available">
                  <CheckList items={guide.completeWhenAvailable} />
                </GuideCard>
              )}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. What the Frontend Does Now</h2>
          <CheckList items={guide.current} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {guide.status === 'Live' ? '3. How It Already Works' : '3. What We Want Instead'}
          </h2>
          {guide.status === 'Live' ? (
            <>
              <GuideCard title="Already Live">
                <StepFlow steps={markDone(guide.currentFlow)} />
              </GuideCard>
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground mb-3">Keep in mind:</p>
                <BulletList items={guide.wanted} />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GuideCard title="Current">
                  <StepFlow steps={markDone(guide.currentFlow)} />
                </GuideCard>
                <GuideCard title="Target">
                  <StepFlow steps={guide.targetFlow} />
                </GuideCard>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground mb-3">Keep in mind:</p>
                <BulletList items={guide.wanted} />
              </div>
            </>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Get Ready to Code</h2>
          <GuideCard title="Open These Files">
            <BulletList items={guide.files} />
          </GuideCard>
          <GuideCard title="Understand the Current Setup">
            <CheckList items={guide.inspect} />
          </GuideCard>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Find the Matching API</h2>
          <GuideTable
            columns={['Item', 'Value']}
            rows={[
              ['API name', guide.apiName],
              ['Method', guide.method],
              ['Endpoint', <code key="endpoint" className="text-blue-300">{guide.endpoint}</code>],
              ['Where to read it', guide.apiLocation],
              ['Why this API matches', guide.whyApi],
            ]}
          />
          <CodeBlock>{guide.requestExample}</CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Understand the API Response</h2>
          <p className="text-muted-foreground leading-relaxed">
            Start by identifying which fields are identifiers, which fields are display values, and which fields the UI actually needs.
          </p>
          <CodeBlock>{guide.responseExample}</CodeBlock>
          <GuideTable columns={['Field', 'What it means', 'Frontend use']} rows={guide.responseFields} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">7. Compare Current and API Data</h2>
          <GuideTable columns={['Current frontend field/idea', 'Current source', 'API field/idea', 'Action']} rows={guide.comparison} />
        </section>

        <IntegrationLayerSection
          status={guide.status}
          service={guide.service}
          serviceExisting={guide.serviceExisting}
          integrationCode={guide.integrationCode}
        />

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">9. Connect the API</h2>
          {guide.connectFix && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">
                The exact change, in {guide.connectFix.file}:
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">Before</p>
              <CodeBlock>{guide.connectFix.before}</CodeBlock>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500 mb-1 mt-3">After</p>
              <CodeBlock>{guide.connectFix.after}</CodeBlock>
            </div>
          )}
          <p className="text-sm font-semibold text-foreground mb-3">Steps:</p>
          <StepFlow steps={combineSteps(guide.connectExisting, guide.connect)} />
          {guide.connectCode && (
            <>
              <p className="text-sm font-semibold text-foreground mb-3 mt-6">In code:</p>
              <CodeBlocks blocks={guide.connectCode} />
            </>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">10. Connect the Result to the UI</h2>
          <p className="text-sm font-semibold text-foreground mb-3">Steps:</p>
          <StepFlow steps={combineSteps(guide.uiExisting, guide.ui)} />
          {guide.uiCode && (
            <>
              <p className="text-sm font-semibold text-foreground mb-3 mt-6">In code:</p>
              <CodeBlocks blocks={guide.uiCode} />
            </>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">11. Handle UI States</h2>
          <GuideTable columns={['State', 'What the frontend should do']} rows={guide.states} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">12. Test the Integration</h2>
          <StepFlow steps={guide.tests} />
          <Callout title="How to tell if mock data is still being used" tone="yellow">
            <p>
              Open the Network tab and trigger the feature. If the expected request is missing, the UI may still be reading hard-coded arrays, sensorData1.json, or a legacy endpoint. Confirm the API request, then confirm the normalized result reaches the component.
            </p>
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">13. Done When</h2>
          <CheckList items={guide.doneWhen} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">14. Common Problems</h2>
          <GuideTable columns={['Problem', 'What to check']} rows={guide.commonProblems} />
        </section>

        <NextUp title="Next Guide">
          <p>{guide.title} work is now mapped. Continue to the next step once this guide's Done When checks are true.</p>
          <Link href={guide.nextHref} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to {guide.nextTitle} <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
