import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ChecklistGroup, NextUp, QuickGlance } from '@/components/guide/GuideBlocks';

const groups = [
  {
    title: 'Before Coding',
    items: [
      'Understand the user need and the expected behaviour.',
      'Inspect existing components, styles, routes, hooks, and utilities before adding new ones.',
      'Identify whether the feature needs UI-only state, API data, form state, or shared application state.',
    ],
  },
  {
    title: 'Component Planning',
    items: [
      'Each component has a clear responsibility.',
      'Reusable components receive clear props and expose clear events.',
      'API calls and raw response handling are kept outside presentation components.',
      'Repeated logic is moved into hooks, utilities, or shared helpers where appropriate.',
    ],
  },
  {
    title: 'UI/UX',
    items: [
      'The main content and primary actions are easy to find.',
      'Spacing, typography, colors, cards, tables, and buttons follow existing project patterns.',
      'Loading, empty, error, and success states are present and understandable.',
      'Long labels, empty data, and large values do not break the layout.',
    ],
  },
  {
    title: 'Responsiveness',
    items: [
      'The page works on mobile, tablet, and desktop widths.',
      'Charts, tables, overlays, dropdowns, forms, and side panels remain usable on small screens.',
      'Text does not overlap or overflow its container.',
    ],
  },
  {
    title: 'Accessibility',
    items: [
      'Form fields have visible or accessible labels.',
      'Interactive elements are reachable by keyboard.',
      'Focus indicators remain visible.',
      'Icon-only controls have accessible names.',
      'Important chart or visual information is also available as text.',
    ],
  },
  {
    title: 'API Integration',
    items: [
      'Request method, endpoint, params, body, and headers match the contract.',
      'Success, empty, validation, auth, not-found, server, and unavailable states are handled where relevant.',
      'Raw API responses are normalized before reaching UI components.',
      'Network and parsing failures show useful feedback.',
    ],
  },
  {
    title: 'Testing',
    items: [
      'The main happy path works.',
      'Edge cases such as empty data, null values, long text, invalid input, and failed requests are tested.',
      'Browser Console and Network tab show no unexpected errors.',
      'Automated tests are added or updated where the project has a suitable test setup.',
    ],
  },
  {
    title: 'Before Pull Request',
    items: [
      'Formatting and linting are run where the project supports them.',
      'No unnecessary console logs or debug-only UI remain.',
      'No secrets, passwords, or private values are committed.',
      'The change summary explains what changed, why, and how to test it.',
    ],
  },
  {
    title: 'Before Release',
    items: [
      'Core flows are tested in the target environment.',
      'Fallback states and error messages are acceptable for users.',
      'Responsive and accessibility checks have been repeated after final changes.',
      'Known limitations are documented instead of hidden.',
    ],
  },
];

export default function QualityChecklistPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Frontend Quality Checklist</h1>
        <p className="text-lg text-muted-foreground">
          General frontend checks for planning, UI/UX, responsiveness, accessibility, API integration, testing, pull requests, and release readiness.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="A full checklist covering planning, UI/UX, responsiveness, accessibility, API integration, testing, and pull requests."
          issue="Before handing work to another contributor, opening a review, or calling a feature done."
          fix="Use it as a final pass before shipping, not a to-do list to follow top to bottom while coding."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <p className="text-muted-foreground leading-relaxed">
            Use this checklist before handing work to another contributor, opening a review, or claiming a feature is ready for users.
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-bold text-foreground mb-4">{group.title}</h2>
            <ChecklistGroup items={group.items} />
          </section>
        ))}

        <NextUp title="Project-Specific Checks">
          <div className="space-y-2">
            <Link href="/guide/frontend-review" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              IoT Frontend Review <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/mock-to-live-integration" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Mock-to-Live Integration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </NextUp>
      </div>
    </article>
  );
}
