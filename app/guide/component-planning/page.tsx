import { ArrowRight, Box, Code2, Layers, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Callout, CheckList, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance } from '@/components/guide/GuideBlocks';

export default function ComponentPlanningPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Component Planning and Code Quality</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to plan frontend code so it is easier to understand, reuse, test, and change.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="How to plan components, hooks, services, and adapters so code stays easy to change."
          issue="Before building a new component or feature, and when deciding whether existing code should be split up."
          fix="Keep API calls out of presentational components. Call a named service function instead."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Is a Component?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A component represents a reusable part of the user interface. It might be small, like a button, or larger, like a chart panel, form, sidebar, or dashboard section.
          </p>
          <CodeBlock>{`function StatusCard({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed mt-4">
            In this example, title and value are props. Props are inputs passed into a component so the same component can display different content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Planning Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Layers className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Responsibility</h3>
              <p className="text-muted-foreground text-sm">Each component should have a clear job.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Box className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Reusability</h3>
              <p className="text-muted-foreground text-sm">Shared patterns should not be copied in many places.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Wrench className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Maintainability</h3>
              <p className="text-muted-foreground text-sm">Future contributors should understand the code quickly.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Code2 className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Separation</h3>
              <p className="text-muted-foreground text-sm">UI code, API code, and utility code should not all be mixed together.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Code Roles</h2>
          <GuideTable
            columns={['Term', 'Beginner-friendly meaning', 'Example']}
            rows={[
              ['Component', 'A reusable UI piece.', 'Button, card, chart, form section.'],
              ['Props', 'Inputs passed into a component.', 'title, value, onClick.'],
              ['Hook', 'A reusable function for state or behaviour in React.', 'useFormState, useSensorData, useFilters.'],
              ['Utility function', 'A helper for calculations or formatting.', 'formatDate, calculateAverage, sortRows.'],
              ['API service', 'Code that sends requests to the backend.', 'getUsers, fetchDatasets, submitForm.'],
              ['Adapter', 'Code that converts one data shape into another.', 'Backend JSON into frontend-friendly chart rows.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Avoid Oversized Components</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            An oversized component tries to do too many things. It becomes hard to read, test, and safely change.
          </p>
          <GuideTable
            columns={['Avoid', 'Prefer']}
            rows={[
              ['One component handles fetching, filtering, calculating, displaying, and error formatting.', 'Split API logic, transformation logic, and display into separate pieces.'],
              ['Every component calls the backend in its own way.', 'Use an API service layer so requests are consistent.'],
              ['The same calculation is copied in several files.', 'Move repeated calculation into a utility function.'],
              ['Important values are hard-coded in many places.', 'Use props, configuration, constants, or backend data where appropriate.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Separating API Logic from UI Components</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            UI components should focus on rendering the interface. API service code should focus on talking to the backend. This makes endpoint changes easier to manage.
          </p>
          <GuideTable
            columns={['Less maintainable', 'More maintainable']}
            rows={[
              ['Component contains a hard-coded fetch call.', 'Component calls a named service function.'],
              ['Each component handles errors differently.', 'Service or hook normalizes errors consistently.'],
              ['Response shape is handled inside the chart or card.', 'Adapter prepares data before it reaches the component.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Component Planning Checklist</h2>
          <CheckList
            items={[
              'What is this component responsible for?',
              'What props does it need?',
              'What states can it show?',
              'Can an existing component already solve this?',
              'Is any logic duplicated somewhere else?',
              'Should API logic be moved to a service or hook?',
              'Are names clear enough for a new contributor?',
              'Are hard-coded values truly static?',
            ]}
          />
        </section>

        <NextUp title="What Should I Do Next?">
          <p>After learning how to structure frontend code, learn how to test API behaviour and diagnose request/response problems.</p>
          <Link href="/guide/api-debugging" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to API Testing <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
