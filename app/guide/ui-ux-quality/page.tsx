import { ArrowRight, Eye, LayoutDashboard, MousePointerClick, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Callout, CheckList, GuideCard, GuideTable, NextUp, QuickGlance } from '@/components/guide/GuideBlocks';

export default function UIUXQualityPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">UI/UX Design and Quality Guidance</h1>
        <p className="text-lg text-muted-foreground">
          A beginner-friendly guide to designing frontend screens that are clear, usable, readable, responsive, and accessible.
        </p>
      </div>

      <div className="mb-8">
        <QuickGlance
          stateLabel="What It Is"
          issueLabel="When To Read It"
          fixLabel="Key Thing To Remember"
          state="How to design screens that are clear, usable, readable, responsive, and accessible."
          issue="When you are designing or reviewing a screen, form, dashboard, chart, or table."
          fix="A screen can look polished and still have bad UX if the user does not know what to do next."
          issueTone="neutral"
        />
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What Is UI vs UX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard title="UI: User Interface">
              <p>UI is what the user sees: layout, buttons, forms, cards, charts, colors, typography, icons, and spacing.</p>
            </GuideCard>
            <GuideCard title="UX: User Experience">
              <p>UX is how the product feels to use: whether the user can understand it, complete tasks, recover from errors, and trust the information shown.</p>
            </GuideCard>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            A screen can look polished but still have poor UX if users do not know what to do next. Good frontend work considers both.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Core UI/UX Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Eye className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Visual hierarchy</h3>
              <p className="text-muted-foreground text-sm">The most important information should be easiest to find. Use headings, spacing, size, and grouping to guide attention.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <LayoutDashboard className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Layout and spacing</h3>
              <p className="text-muted-foreground text-sm">Related items should be visually grouped. Unrelated items need enough space between them so the page is easy to scan.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <MousePointerClick className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Clear interaction</h3>
              <p className="text-muted-foreground text-sm">Buttons should look clickable, links should look like navigation, and forms should clearly show required input and errors.</p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <Smartphone className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Responsive behaviour</h3>
              <p className="text-muted-foreground text-sm">The interface should adapt when the screen becomes smaller, wider, or touch-based.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Designing Common Frontend Areas</h2>
          <GuideTable
            columns={['Area', 'What good looks like', 'Beginner mistake to avoid']}
            rows={[
              ['Navigation', 'Short labels, visible active state, predictable routes.', 'Adding too many similar links without grouping them.'],
              ['Forms', 'Visible labels, helpful validation, clear submit action, success and failure messages.', 'Using placeholder text as the only label.'],
              ['Cards', 'One clear topic per card, useful heading, concise body text.', 'Putting several unrelated ideas into one card.'],
              ['Dashboards', 'Important metrics and controls are easy to find, charts are readable, filters are clear.', 'Showing too much explanation before the main data.'],
              ['Charts', 'Readable labels, legends, units, responsive size, text summary for important insight.', 'Assuming the chart alone explains everything.'],
              ['Tables', 'Useful columns, readable rows, clear empty state, responsive handling.', 'Adding too many columns without thinking about mobile.'],
            ]}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Loading, Empty, and Error States</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A user should never be left guessing. If data is not visible, the interface should explain what is happening.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GuideCard title="Loading state">
              <p>Tell the user that information is being fetched or calculated.</p>
            </GuideCard>
            <GuideCard title="Empty state">
              <p>Explain that the request worked, but there is no data to show.</p>
            </GuideCard>
            <GuideCard title="Error state">
              <p>Explain that something failed and give a useful next step where possible.</p>
            </GuideCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Accessibility</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Accessibility means the interface can be used by people with different needs, devices, and assistive technologies. It also improves the experience for everyone.
          </p>
          <CheckList
            items={[
              'Use readable text size and contrast.',
              'Use visible labels for inputs.',
              'Make buttons and links usable with the keyboard.',
              'Keep focus indicators visible.',
              'Do not rely on color alone to communicate meaning.',
              'Provide text alternatives for important visual information.',
            ]}
          />
        </section>

        <NextUp title="What Should I Do Next?">
          <p>After learning the basics of UI/UX quality, continue to component planning so you can structure the code behind the interface.</p>
          <Link href="/guide/component-planning" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
            Continue to Component and Code Quality <ArrowRight className="w-4 h-4" />
          </Link>
        </NextUp>
      </div>
    </article>
  );
}
