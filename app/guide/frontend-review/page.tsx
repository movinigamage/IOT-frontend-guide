import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  BulletList,
  CheckList,
  FindingItem,
  FindingsList,
  FindingsSection,
  GuideCard,
  Note,
  NextUp,
  PriorityCard,
  PriorityList,
  QuickGlance,
  StepFlow,
} from '@/components/guide/GuideBlocks';

const strengths = [
  'Already split into pages, components, hooks, utilities, services, and layout files.',
  'Reusable hooks handle sensor data loading, filtering, stream names, and time range logic.',
  'Dashboard pieces (stream selectors, stats cards, charts, scatter plots, correlation) are separated.',
  'Correlation, trendline, and variance logic live in utility functions, not buried in UI code.',
  'Consistent dashboard style: cards, panels, spacing, blue accents.',
  'Home, dashboard, and auth pages already use responsive layout patterns.',
  'The dashboard gives useful guidance for 0, 1, 2, or many selected streams.',
];

const integrationFindings = [
  {
    title: 'Dashboard series bug',
    tone: 'blocked' as const,
    priority: 'High',
    current: 'Targets the live Series API, but passes arguments in the wrong order to a refactored useSensorData.js, so every dashboard shows "Error loading data".',
    direction: 'Pass datasetName as the first argument, not a pre-built URL string.',
  },
  {
    title: 'Dataset route handling',
    tone: 'available' as const,
    priority: 'Resolved',
    current: 'Done. DashboardPage.jsx reads the route id and passes it into Dashboard.',
    direction: 'No action needed.',
  },
  {
    title: 'Home datasets',
    tone: 'available' as const,
    priority: 'Resolved',
    current: 'Done. HomePage.jsx loads real cards via useDatasets() (GET /api/datasets, then per-id). No hard-coded array remains.',
    direction: 'Extend buildDatasetCard() in useDatasets.js only if new fields are needed.',
  },
  {
    title: 'Analytics',
    tone: 'pending' as const,
    priority: 'Medium',
    current: 'Local correlation works. A frontend service (analysisService.js) exists but nothing calls it; backend still returns placeholder output.',
    direction: 'Wire analysisService.js in behind an unavailable/placeholder check once backend analytics (BDAI-10) is real.',
  },
  {
    title: 'Alerts',
    tone: 'defined' as const,
    priority: 'Low',
    current: 'ActiveAlerts.jsx is fully built but not mounted anywhere. No live backend alert route exists yet.',
    direction: 'Mount it now with an honest "not yet analysed" state; connect once BDAI-11 exists.',
  },
];

const improvementFindings = [
  {
    title: 'Frontend Structure',
    tone: 'pending' as const,
    priority: 'Medium',
    current: 'Dashboard owns loading, selection, filtering, analysis, controls, and rendering. Large components are harder for beginners to change safely.',
    direction: 'Gradually separate data loading, controls, analysis, and display.',
  },
  {
    title: 'Code Quality',
    tone: 'pending' as const,
    priority: 'Medium',
    current: 'Some data is hard-coded; temporary console logging remains near the dashboard. Hard-coded live-like data goes stale; noisy logs make debugging harder.',
    direction: 'Move changing data behind services and remove stale logs.',
  },
  {
    title: 'API Integration',
    tone: 'blocked' as const,
    priority: 'High',
    current: 'Datasets are fully live. Series targets the live endpoint but is broken by an argument-order bug. Every dashboard route shows "Error loading data", not because integration was never attempted.',
    direction: 'Fix the useSensorData(...) call in Dashboard.jsx (see the Series guide), then re-verify end to end.',
  },
  {
    title: 'Responsive Design',
    tone: 'pending' as const,
    priority: 'Medium',
    current: 'Some chart and time panel sizing is fixed. Fixed sizes can overflow small screens.',
    direction: 'Use responsive containers; test on mobile widths.',
  },
  {
    title: 'Accessibility',
    tone: 'pending' as const,
    priority: 'Medium',
    current: 'Some forms and custom controls need stronger labels and focus states. Assistive-tech users may struggle if labels or state are unclear.',
    direction: 'Add visible labels, accessible names, focus states, chart summaries.',
  },
];

const uiUxFindings = [
  {
    title: 'Dashboard layout',
    current: 'Clear sections for notes, streams, controls, insights, charts, analysis.',
    direction: 'Keep the structure; keep primary data and controls easy to find.',
  },
  {
    title: 'Data presentation',
    current: 'Stats cards, chart view, scatter plot, correlation summary.',
    direction: 'Use friendlier stream labels once a reliable display-name source exists.',
  },
  {
    title: 'Forms',
    current: 'Login has visible labels and helpful validation messages.',
    direction: 'Add persistent labels to forms that currently rely on placeholders.',
  },
  {
    title: 'Charts',
    current: 'Chart components are separated and useful.',
    direction: 'Make charts responsive; add text summaries for key insights.',
  },
  {
    title: 'User feedback',
    current: 'Useful selected-stream messages already exist.',
    direction: 'Add specific states: validation, not found, unavailable, auth failure.',
  },
];

export default function FrontendReviewPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">IoT Frontend Review</h1>
        <p className="text-lg text-muted-foreground">
          What exists in the IoT frontend today, before you change or integrate it.
        </p>
      </div>

      <div className="mb-10">
        <QuickGlance
          state="Datasets are fully live. The dashboard already targets live Series data too, not mock data."
          issue="One bug (wrong argument order in Dashboard.jsx) currently breaks every dashboard load."
          fix="Fix the Series call in Dashboard.jsx first. See the Series guide for the exact one-line change."
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">The Frontend, At a Glance</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A React/Vite app with authentication, a dataset home page, and a dashboard for sensor/time-series data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GuideCard title="Main pages">
              <p>Login, registration, forgot password, home dataset page, dashboard.</p>
            </GuideCard>
            <GuideCard title="Dashboard">
              <p>Stream selection, time filtering, statistics, charts, scatter plots, local correlation.</p>
            </GuideCard>
            <GuideCard title="Code structure">
              <p>Pages render screens. Components render UI pieces. Hooks manage data. Utilities do the math.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Current Frontend Flow</h2>
          <StepFlow
            steps={[
              { label: 'Live backend data (currently broken)', broken: true },
              'Frontend data hook',
              'Filtering / time logic',
              'Dashboard',
              'Charts / statistics',
              'User interface',
            ]}
          />
          <div className="mt-4">
            <Note
              title="Why It Matters"
              items={[
                "Already targets live data. This isn't a mock-to-live migration anymore.",
                "One refactor mismatch broke every dashboard load: useSensorData.js changed shape, Dashboard.jsx wasn't updated to match.",
                'Fix is documented in the Series mock-to-live guide.',
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What's Already Working Well</h2>
          <div className="bg-card/50 border border-border/70 rounded-2xl p-6 shadow-sm">
            <CheckList items={strengths} />
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Bottom line:</strong> don't rebuild the dashboard for the new data source. Change how data reaches the existing components instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Findings &amp; Priorities</h2>
          <div className="space-y-3">
            <FindingsSection title="API Integration Findings" meta="5 topics · 1 high priority · 2 resolved" defaultOpen>
              <FindingsList>
                {integrationFindings.map((f) => (
                  <FindingItem key={f.title} title={f.title} tone={f.tone} priority={f.priority}>
                    {f.current}
                  </FindingItem>
                ))}
              </FindingsList>
            </FindingsSection>

            <FindingsSection title="Areas for Improvement" meta="5 items · structure, code quality, accessibility">
              <FindingsList>
                {improvementFindings.map((f) => (
                  <FindingItem key={f.title} title={f.title} tone={f.tone} priority={f.priority}>
                    {f.direction}
                  </FindingItem>
                ))}
              </FindingsList>
            </FindingsSection>

            <FindingsSection title="UI/UX Findings" meta="5 items · layout, forms, charts, feedback">
              <FindingsList>
                {uiUxFindings.map((f) => (
                  <FindingItem key={f.title} title={f.title}>
                    {f.direction}
                  </FindingItem>
                ))}
              </FindingsList>
            </FindingsSection>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Priorities</h2>
          <PriorityList>
            <PriorityCard title="Fix the Series data bug" priority="High">
              <BulletList
                items={[
                  <><strong className="text-foreground">State:</strong> Home datasets are fully live. Series targets the live API too, but a call-site bug (wrong argument order after a hook refactor) breaks every dashboard.</>,
                  <><strong className="text-foreground">Why it matters:</strong> the single blocker keeping the dashboard from showing any live data. Almost everything else is already done.</>,
                  <><strong className="text-foreground">Do this:</strong> apply the one-line fix in the Series mock-to-live guide, then re-verify the dashboard end to end.</>,
                ]}
              />
            </PriorityCard>

            <PriorityCard title="Structure, reliability, responsiveness, accessibility" priority="Medium">
              Tighten responsibility boundaries, responsive chart behaviour, accessible form labels, and status-specific error states as integration work continues.
            </PriorityCard>

            <PriorityCard title="Cleanup and refinement" priority="Low">
              Clean up remaining demo/prototype pieces and temporary logs once the critical live-data path is settled.
            </PriorityCard>
          </PriorityList>
        </section>

        <NextUp title="What Should I Read Next?">
          <p>See what APIs are available to the frontend and how to read request/response examples.</p>
          <Link href="/guide/data-api-reference" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to Data API Reference and Frontend-Ready Examples <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
