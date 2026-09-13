import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Callout, CheckList, CodeBlock, GuideCard, GuideTable, NextUp, QuickGlance, StepFlow } from '@/components/guide/GuideBlocks';

export default function FrontendWorkflowPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Frontend Best Practices</h1>
        <p className="text-lg text-muted-foreground">
          A practical introduction to building frontend features that are understandable, reusable, responsive, accessible, and easier for the next contributor to maintain.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="A practical intro to building frontend features: workflow, separation of concerns, reuse, state, responsiveness, and accessibility."
          issue="Read this first if you are new to frontend work, before touching component structure or API code."
          fix="For every feature that loads data, design at least four states: loading, success, empty, and error."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Is Frontend Development?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Frontend development is the part of a web application that users see and interact with. It includes pages, buttons, forms, charts, navigation, loading states, error messages, and the code that requests data for the interface.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Good frontend work is not only about making something appear on screen. It is about making the interface clear, reliable, usable on different devices, and easy for another developer to improve later.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Understanding the Frontend Workflow</h2>
          <StepFlow
            steps={[
              'Understand requirement',
              'Plan UI',
              'Plan components',
              'Build',
              'Connect data',
              'Handle states',
              'Test',
              'Review',
            ]}
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            This flow helps prevent rushed changes. Before writing code, understand what the user needs and how the interface should behave when data is loading, missing, invalid, or unavailable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Separation of Concerns</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Separation of concerns means different parts of the code have different jobs. A page should not mix every responsibility into one place.
          </p>
          <GuideTable
            columns={['Concern', 'Simple meaning', 'Example responsibility']}
            rows={[
              ['UI', 'What the user sees and clicks.', 'Render cards, forms, buttons, charts, and messages.'],
              ['Data/API logic', 'How the frontend asks for information.', 'Call an endpoint, handle status codes, parse JSON.'],
              ['Utility logic', 'Reusable calculations or formatting.', 'Format a date, calculate a value, sort rows.'],
              ['State logic', 'What the interface currently knows.', 'Selected tab, loading state, selected filter, error message.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Reusable Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="Component">
              <p>A component is a reusable part of the user interface, such as a button, card, chart, form field, or dashboard panel.</p>
            </GuideCard>
            <GuideCard title="Reusable component">
              <p>A reusable component can be used in more than one place because its inputs are clear and it does not depend on hidden page-specific assumptions.</p>
            </GuideCard>
            <GuideCard title="Why reuse matters">
              <p>Reuse reduces duplicated code, keeps the UI consistent, and makes future changes easier.</p>
            </GuideCard>
            <GuideCard title="When not to reuse">
              <p>Do not force reuse too early. If two pieces only look similar but behave differently, keep them separate until the shared pattern is clear.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">State and Data Handling</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            State is information the frontend remembers while the user is using the page. Data is information the interface displays or works with. Some data comes from users, and some comes from APIs.
          </p>
          <CodeBlock>{`// Small example of UI state
const [isOpen, setIsOpen] = useState(false);

// Small example of data state
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);`}</CodeBlock>
          <p className="text-muted-foreground leading-relaxed mt-4">
            A beginner-friendly rule: keep state as close as possible to where it is used, and only move it higher when more than one component needs it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Responsive Development</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Responsive development means the interface works on different screen sizes. A page should not only work on a large laptop screen; it should remain usable on mobile and tablet widths.
          </p>
          <CheckList
            items={[
              'Use layouts that can stack on smaller screens.',
              'Avoid fixed widths for charts, tables, forms, and panels unless there is a clear fallback.',
              'Check long text, long labels, and empty states on small screens.',
              'Make tap targets large enough for touch devices.',
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility Basics</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Accessibility means people with different abilities and tools can still use the interface. It should be considered while building, not added only after everything else is finished.
          </p>
          <CheckList
            items={[
              'Use labels for form fields.',
              'Make sure buttons and links can be reached with the keyboard.',
              'Keep focus indicators visible.',
              'Do not rely only on color to communicate meaning.',
              'Provide text alternatives for important visual information.',
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Error Handling</h2>
          <p className="text-muted-foreground leading-relaxed">
            A good frontend handles more than the happy path. Users need useful feedback when data is loading, no results exist, a request fails, or their input is invalid.
          </p>
          <Callout title="Practical rule" tone="yellow">
            <p>For every feature that loads data, design at least four states: loading, success, empty, and error.</p>
          </Callout>
        </section>

        <NextUp title="What Should I Do Next?">
          <p>Once you understand the general workflow, learn how to plan UI quality and component structure.</p>
          <div className="space-y-2">
            <Link href="/guide/ui-ux-quality" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Continue to UI/UX Guidance <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/component-planning" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
              Continue to Component and Code Quality <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </NextUp>
      </div>
    </article>
  );
}
