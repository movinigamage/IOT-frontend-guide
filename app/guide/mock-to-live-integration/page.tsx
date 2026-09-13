import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Callout, CheckList, FindingItem, FindingsList, FindingsSection, GuideCard, GuideTable, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';
import { mockToLiveGuides } from '@/lib/mockToLiveGuides';

const integrationStatus = [
  {
    area: 'Datasets',
    tone: 'available' as const,
    status: 'Live',
    meaning: 'Done. HomePage.jsx loads real datasets through the useDatasets() hook (GET /api/datasets, then GET /api/datasets/:id per dataset). No hard-coded dataset array remains.',
  },
  {
    area: 'Series',
    tone: 'blocked' as const,
    status: 'Live / Bug Found',
    meaning: 'Dashboard.jsx already targets the live Series API, but a recent useSensorData.js refactor changed its parameters and Dashboard.jsx was not updated to match, so every dashboard currently shows "Error loading data". See the Series guide for the exact one-line fix.',
  },
  {
    area: 'Filters',
    tone: 'defined' as const,
    status: 'Ready / Transitional',
    meaning: 'Backend filter route exists. Current filtering is mainly browser-side, so backend stream filtering should be introduced carefully while preserving useful local time/display controls.',
  },
  {
    area: 'Analytics',
    tone: 'pending' as const,
    status: 'Prepare Now / Pending Backend',
    meaning: 'The frontend already performs local analytics. POST /api/analyse exists, but backend analytics currently remain placeholder functionality pending BDAI-10.',
  },
  {
    area: 'Latest Alerts',
    tone: 'pending' as const,
    status: 'Prepare Now / Pending Backend',
    meaning: 'Frontend-ready examples exist, but the live backend route is not implemented yet. Complete live work after BDAI-11.',
  },
  {
    area: 'Alert History',
    tone: 'pending' as const,
    status: 'Prepare Now / Pending Backend',
    meaning: 'Frontend-ready examples include filters and pagination, but backend alert history is not implemented yet. Complete live work after BDAI-11.',
  },
];

export default function MockToLivePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Mock-to-Live</h1>
        <p className="text-lg text-muted-foreground">
          A beginner-friendly starting point for moving the IoT frontend from temporary data sources to real backend API data.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="Where To Start"
          fixLabel="Key Thing To Remember"
          state="Six guides, one per frontend feature, each showing what is already done versus what is left."
          issue="Pick a feature below, or start with Datasets and work down the list in order."
          fix="Datasets is done. Series is wired but has one known bug. The rest are unbuilt or half-built."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Mock-to-Live Means</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mock data is temporary or example data used while frontend functionality is being developed. Mock-to-Live is the process of replacing those temporary data sources with real data returned by the IoT backend APIs.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The goal is not to rebuild frontend components that already work. The goal is to change how reliable data reaches those components.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Current">
              <StepFlow steps={['Mock / hard-coded data', 'Frontend components', 'UI']} />
              <p>The UI can look useful while still reading local arrays, local JSON, or legacy endpoint assumptions.</p>
            </GuideCard>
            <GuideCard title="Target">
              <StepFlow steps={['IoT Backend API', 'Frontend service / adapter', 'Existing frontend components', 'UI']} />
              <p>The API returns data, the adapter makes it predictable, and the existing components keep doing their display job.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Why This IoT Project Needs It</h2>
          <p className="text-muted-foreground leading-relaxed">
            The current IoT frontend already has useful dataset cards, dashboard layout, stream selection, time controls, charts, statistics, scatter plots, and local analytics. The next step is progressive live integration, because some areas still rely on hard-coded data, local mock sensor data, legacy API assumptions, or backend features that are not complete yet.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Progressive means doing one boundary at a time: datasets first, then series rows, then filtering, then analytics and alerts when their backend support is ready.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Current Integration Status</h2>
          <FindingsSection title="Integration Status by Area" meta={`${integrationStatus.length} areas · what each status means for frontend work`} defaultOpen>
            <FindingsList>
              {integrationStatus.map((item) => (
                <FindingItem key={item.area} title={item.area} tone={item.tone} priority={item.status}>
                  {item.meaning}
                </FindingItem>
              ))}
            </FindingsList>
          </FindingsSection>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Understand the Status Labels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Live">
              <p>The frontend already uses real backend data for this feature. Documented as done, not as a task to build.</p>
            </GuideCard>
            <GuideCard title="Live / Bug Found">
              <p>The frontend already targets the live backend, but a specific, identified bug currently breaks it. Fixing the bug is the task, not building new integration.</p>
            </GuideCard>
            <GuideCard title="Transitional">
              <p>The backend endpoint exists, but the response may not yet exactly match the final API contract. Use a small adapter or normalizer so components receive one consistent data shape.</p>
            </GuideCard>
            <GuideCard title="Prepare Now">
              <p>Frontend structure can be prepared using agreed examples, but the complete live backend functionality is not ready.</p>
            </GuideCard>
            <GuideCard title="Pending Backend">
              <p>Do not present the feature as live yet. This is especially important for Analytics and Alerts.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Before You Start</h2>
          <CheckList
            items={[
              'Work in the actual IoT frontend project at new-frontend/frontend, not inside this support toolkit.',
              'Start the IoT frontend with its Vite dev script from that frontend project.',
              'Use VITE_API_BASE_URL for the backend API base URL. Local examples use http://localhost:3000/api.',
              'Open Browser DevTools and use the Network tab to confirm which requests are really being sent.',
              'Learn to read the request method, endpoint, request body, HTTP status, and JSON response.',
              'New to API requests? Read API Testing first.',
              'Not sure how frontend and backend communicate? Read Frontend-Backend Integration Guide first.',
              'Need endpoint details? Open Data API Reference and Frontend-Ready Examples.',
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How the Six Guides Work</h2>
          <StepFlow
            steps={[
              'Understand what exists',
              'Open the relevant files',
              'Find the matching API',
              'Compare current and API data',
              'Prepare the service / adapter',
              'Connect the live data',
              'Connect it to the existing UI',
              'Handle loading / empty / errors',
              'Test',
              'Confirm Definition of Done',
            ]}
          />
          <p className="text-muted-foreground leading-relaxed">
            These guides do not simply tell you to connect the API. They show where the current implementation lives, which API is relevant, what needs to be preserved, how the data should move through the frontend, and how to verify the result.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Guide Order</h2>
          <GuideTable
            columns={['Order', 'Guide', 'Purpose']}
            rows={mockToLiveGuides.map((guide, index) => [
              String(index + 1),
              <Link key={guide.slug} href={`/guide/mock-to-live-integration/${guide.slug}`} className="text-blue-400 hover:text-blue-300 font-semibold">{guide.title}</Link>,
              guide.description,
            ])}
          />
        </section>

        <Callout title="Preserve Working Frontend Behaviour" tone="yellow">
          <p>
            Moving from mock data to live data does not mean rebuilding the entire frontend. Where possible, preserve dataset card UI, dashboard layout, stream controls, charts, statistics, existing useful hooks, existing local analytics, and existing UI patterns. The primary change should happen at the data/integration boundary.
          </p>
        </Callout>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Choose a Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockToLiveGuides.map((guide) => (
              <GuideCard key={guide.slug} title={guide.title}>
                <p className="font-semibold text-foreground">{guide.shortLabel}</p>
                <p>{guide.description}</p>
                <Link href={`/guide/mock-to-live-integration/${guide.slug}`} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
                  Start {guide.title} Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </GuideCard>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
